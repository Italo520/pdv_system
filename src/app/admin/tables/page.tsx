import { getTables } from "@/actions/table";
import { TableEditor } from "@/components/admin/table-editor";

export default async function AdminTablesPage() {
    const tables = await getTables();

    // Map Decimal/Dates if necessary for Client Component
    // Prisma returns simple objects usually ok for Server Components -> Client Components if no complex types
    // But xPosition/yPosition are Int, status is String (Enum), so it should be fine.
    // NOTE: Prisma Dates might need toString() if passed to client directly depending on Next.js version, but commonly it warns. 
    // Let's pass as is and check. If error, we serialize.
    // Actually, let's play safe and map if needed, or just pass. 
    // Given the props type in TableEditor: Table[]

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Administração de Mesas</h1>
            <p className="text-muted-foreground mb-6">
                Gerencie o layout físico do salão. Adicione mesas e arraste para posicionar.
            </p>
            <div className="h-[calc(100vh-200px)]">
                <TableEditor initialTables={tables as any[]} />
            </div>
        </div>
    );
}
