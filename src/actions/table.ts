'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getOrCreateTable(tableNumber: number) {
    try {
        let table = await prisma.table.findFirst({
            where: { number: tableNumber }
        });

        if (!table) {
            let defaultRestaurant = await prisma.restaurant.findFirst();

            // Auto-seed: Create default restaurant if none exists
            if (!defaultRestaurant) {
                defaultRestaurant = await prisma.restaurant.create({
                    data: {
                        name: "Meu Restaurante",
                        cnpj: "00.000.000/0001-00",
                        fiscalMode: "HOMOLOGATION",
                        serviceTax: 10
                    }
                });
            }

            table = await prisma.table.create({
                data: {
                    number: tableNumber,
                    restaurantId: defaultRestaurant.id,
                    status: 'FREE',
                    xPosition: 0,
                    yPosition: 0
                }
            });
        }

        revalidatePath('/pdv/tables');
        return table;
    } catch (error) {
        console.error("Error in getOrCreateTable:", error);
        throw new Error("Erro ao buscar ou criar mesa.");
    }
}

export async function deleteTable(tableId: string) {
    try {
        // Verify if table allows deletion (no active orders)
        const table = await prisma.table.findUnique({
            where: { id: tableId },
            include: {
                orders: {
                    where: { status: { in: ['OPEN', 'PREPARING', 'READY'] } }
                }
            }
        });

        if (!table) throw new Error("Mesa não encontrada.");

        if (table.orders.length > 0) {
            return { error: "Não é possível excluir: Mesa possui comandas abertas." };
        }

        await prisma.table.delete({
            where: { id: tableId }
        });

        revalidatePath('/pdv/tables');
        return { success: true };
    } catch (error) {
        console.error("Error deleting table:", error);
        return { error: "Erro ao excluir mesa." };
    }
}
