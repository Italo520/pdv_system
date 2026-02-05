'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface TransferItem {
    id: string; // OrderItem ID
    quantity: number;
}

interface TransferData {
    sourceOrderId: string;
    targetTableNumber?: number; // Target by Table Number
    targetOrderId?: string;     // OR Target by Order ID (if known)
    items: TransferItem[];
}

export async function transferItems(data: TransferData) {
    const { sourceOrderId, targetTableNumber, targetOrderId, items } = data;

    if (!items || items.length === 0) {
        return { error: "Nenhum item selecionado para transferência." };
    }

    try {
        return await prisma.$transaction(async (tx: any) => {
            // 1. Get Source Order
            const sourceOrder = await tx.order.findUnique({
                where: { id: sourceOrderId },
                include: { items: true }
            });

            if (!sourceOrder) throw new Error("Pedido de origem não encontrado.");
            if (sourceOrder.status === 'CLOSED' || sourceOrder.status === 'CANCELLED') {
                throw new Error("Não é possível transferir de um pedido fechado.");
            }

            // 2. Determine Target Order
            let targetOrder: { id: string, restaurantId: string } | null = null;

            if (targetOrderId) {
                targetOrder = await tx.order.findUnique({ where: { id: targetOrderId } });
            } else if (targetTableNumber) {
                // Find open order for this table
                const table = await tx.table.findFirst({
                    where: {
                        number: targetTableNumber,
                        restaurantId: sourceOrder.restaurantId
                    }
                });

                if (!table) throw new Error(`Mesa ${targetTableNumber} não encontrada.`);

                const existingOrder = await tx.order.findFirst({
                    where: {
                        tableId: table.id,
                        status: { in: ['OPEN', 'PREPARING', 'READY', 'DELIVERED'] }
                    }
                });

                if (existingOrder) {
                    targetOrder = existingOrder;
                } else {
                    // Create new order for the target table
                    targetOrder = await tx.order.create({
                        data: {
                            restaurantId: sourceOrder.restaurantId,
                            tableId: table.id,
                            status: 'OPEN',
                            customerName: `Mesa ${table.number}`,
                            peopleCount: 1
                        }
                    });

                    // Update table status
                    await tx.table.update({
                        where: { id: table.id },
                        data: { status: 'OCCUPIED' }
                    });
                }
            } else {
                throw new Error("Mesa ou Pedido de destino devem ser informados.");
            }

            if (!targetOrder) throw new Error("Erro ao identificar pedido de destino.");
            if (targetOrder.id === sourceOrder.id) throw new Error("Destino igual à origem.");

            // 3. Process Items
            const transferredItemsLog = [];

            for (const item of items) {
                // Determine item name for log
                const originalItem = sourceOrder.items.find((i: any) => i.id === item.id);
                if (!originalItem) continue;

                transferredItemsLog.push({
                    id: item.id,
                    name: `Item #${item.id}`, // Ideal would be product name, fetched if needed
                    quantity: item.quantity
                });

                // Move item
                await tx.orderItem.update({
                    where: { id: item.id },
                    data: {
                        orderId: targetOrder.id
                    }
                });
            }

            // 4. Create Transfer Log
            await tx.transferLog.create({
                data: {
                    sourceOrderId: sourceOrder.id,
                    targetOrderId: targetOrder.id,
                    items: JSON.stringify(transferredItemsLog),
                    userName: "Sistema" // Replace with actual user from session
                }
            });

            // 5. Update Totals (Simple recalculation logic)
            // Note: In a real app, you'd sum up unitPrice * quantity for all items in both orders
            // For now, we rely on the next fetch or trigger total recalculation if implemented

            // Revalidate
            revalidatePath('/pdv');
            revalidatePath(`/pdv/${sourceOrderId}`);
            revalidatePath(`/pdv/${targetOrder.id}`);

            return { success: true, targetOrderId: targetOrder.id };
        });
    } catch (error: any) {
        console.error("Erro na transferência:", error);
        return { error: error.message || "Erro desconhecido ao transferir itens." };
    }
}
