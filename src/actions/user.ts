'use server'

import prisma from "@/lib/prisma"

export async function getWaiters() {
    try {
        const waiters = await prisma.user.findMany({
            where: {
                role: {
                    in: ['WAITER', 'ADMIN', 'MANAGER']
                }
            },
            select: {
                id: true,
                name: true,
                role: true
            }
        });

        // Return dummy if empty (for dev/demo)
        if (waiters.length === 0) {
            return [
                { id: "w1", name: "Carlos (Garçom)", role: "WAITER" },
                { id: "w2", name: "Ana (Gerente)", role: "MANAGER" },
                { id: "w3", name: "João (Garçom)", role: "WAITER" },
                { id: "w4", name: "Maria (Garçom)", role: "WAITER" }
            ];
        }

        return waiters;
    } catch (error) {
        console.error("Error fetching waiters:", error);
        return [];
    }
}
