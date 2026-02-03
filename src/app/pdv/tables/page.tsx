import prisma from "@/lib/prisma";
import { TablesMap } from "./tables-map";

export default async function TablesPage() {
    // Buscar mesas com pedidos ativos
    const tablesRaw = await prisma.table.findMany({
        include: {
            orders: {
                where: {
                    status: {
                        in: ['OPEN', 'PREPARING', 'READY', 'DELIVERED']
                    }
                },
                include: {
                    items: true
                }
            }
        }
    });

    // Serialize to plain objects
    const tables = JSON.parse(JSON.stringify(tablesRaw));

    return <TablesMap initialTables={tables} />;
}
