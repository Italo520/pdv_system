'use server';

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function openOrder(data: {
    tableId?: string;
    tableNumber?: number;
    waiterId: string;
    customerName?: string;
    peopleCount?: number;
}) {
    try {
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            let table;

            // 1. Identificar ou Criar a Mesa
            if (data.tableId) {
                table = await tx.table.findUnique({
                    where: { id: data.tableId }
                });
            } else if (data.tableNumber) {
                // Tenta encontrar pelo número
                table = await tx.table.findFirst({
                    where: { number: data.tableNumber }
                });

                if (!table) {
                    let defaultRestaurant = await tx.restaurant.findFirst();

                    // Auto-seed: Create default restaurant if none exists
                    if (!defaultRestaurant) {
                        defaultRestaurant = await tx.restaurant.create({
                            data: {
                                name: "Meu Restaurante",
                                cnpj: "00.000.000/0001-00", // Default dummy CNPJ
                                fiscalMode: "HOMOLOGATION",
                                serviceTax: 10
                            }
                        });
                    }

                    table = await tx.table.create({
                        data: {
                            number: data.tableNumber,
                            status: 'FREE', // Será atualizado para OCCUPIED abaixo
                            restaurantId: defaultRestaurant.id,
                            xPosition: 0,
                            yPosition: 0
                        }
                    });
                }
            } else {
                throw new Error("É necessário informar o ID ou o Número da mesa.");
            }

            if (!table) {
                throw new Error("Mesa não encontrada e não foi possível criar.");
            }

            // 1.1. Identificar ou Criar Usuário (Garçom)
            // Se o ID for o mock do frontend ou se não existir usuário
            let waiterId = data.waiterId;
            if (waiterId === 'current-user-id') {
                const defaultUser = await tx.user.findFirst();
                if (defaultUser) {
                    waiterId = defaultUser.id;
                } else {
                    // Se não tiver restaurante (edge case pois criamos acima), pega o criado
                    const restaurant = await tx.restaurant.findFirst();
                    if (!restaurant) throw new Error("Erro interno: Restaurante não disponível para criar usuário.");

                    const newUser = await tx.user.create({
                        data: {
                            name: "Garçom Padrão",
                            email: "garcom@pdv.com",
                            password: "123", // Num sistema real hash
                            role: "WAITER",
                            restaurantId: restaurant.id
                        }
                    });
                    waiterId = newUser.id;
                }
            }

            // 2. Cria a Ordem (Comanda)
            const newOrder = await tx.order.create({
                data: {
                    status: 'OPEN',
                    tableId: table.id,
                    waiterId: waiterId,
                    customerName: data.customerName,
                    peopleCount: data.peopleCount || 1,
                    totalAmount: 0,
                    serviceTax: 0,
                }
            });

            // 3. Atualiza o status da Mesa para OCUPADA se estiver LIVRE
            if (table.status === 'FREE') {
                await tx.table.update({
                    where: { id: table.id },
                    data: {
                        status: 'OCCUPIED',
                    }
                });
            }

            return newOrder;
        });
    } catch (error) {
        console.error("Erro ao abrir comanda:", error);
        throw error;
    } finally {
        revalidatePath('/pdv/tables');
    }
}

export async function getOrdersByTable(tableId: string) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                tableId: tableId,
                status: {
                    in: ['OPEN', 'PREPARING', 'READY', 'DELIVERED'] // Active statuses
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                waiter: true
            }
        });
        return orders;
    } catch (error) {
        console.error("Erro ao buscar comandas da mesa:", error);
        return [];
    }
}
// ... existing code ...

export async function getClosedOrders() {
    try {
        const closedOrders = await prisma.order.findMany({
            where: {
                status: 'CLOSED',
                updatedAt: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24h
                }
            },
            include: {
                table: true,
                waiter: true,
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            },
            take: 50
        });

        return closedOrders;
    } catch (error) {
        console.error("Error fetching closed orders:", error);
        return [];
    }
}
