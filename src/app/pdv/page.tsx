"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/pdv/sidebar";
import { TableMap } from "@/components/pdv/table-map";
import { TableDetailsModal } from "@/components/pdv/table-details-modal";
import { OpenTableModal } from "@/components/pdv/open-table-modal";
import { getTables } from "@/actions/table";
import { Loader2 } from "lucide-react";

export default function PDVDashboard() {
    const [tables, setTables] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTable, setSelectedTable] = useState<any>(null);
    const [openModalType, setOpenModalType] = useState<'OPEN' | 'DETAILS' | null>(null);

    useEffect(() => {
        loadTables();
        const interval = setInterval(loadTables, 5000); // Polling every 5s for updates
        return () => clearInterval(interval);
    }, []);

    const loadTables = async () => {
        try {
            const data = await getTables();
            setTables(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTableClick = (tableId: string) => {
        const table = tables.find(t => t.id === tableId);
        if (!table) return;

        setSelectedTable(table);
        if (table.status === 'FREE') {
            setOpenModalType('OPEN');
        } else {
            setOpenModalType('DETAILS');
        }
    };

    const handleCloseModal = () => {
        setOpenModalType(null);
        setSelectedTable(null);
        loadTables(); // Refresh after action
    };

    return (
        <div className="flex bg-background h-screen w-screen overflow-hidden font-sans text-foreground">
            {/* Sidebar Fixa */}
            <div className="h-full shrink-0 p-3 z-50">
                <Sidebar className="w-20" />
            </div>

            <main className="flex-1 flex flex-col gap-4 py-3 pr-3 overflow-hidden max-w-full relative">
                <header className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-black uppercase italic font-display">Mapa de Mesas</h1>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full" /> <span className="text-xs uppercase font-bold">Livre</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full" /> <span className="text-xs uppercase font-bold">Ocupada</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full" /> <span className="text-xs uppercase font-bold">Pagamento</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 border rounded-2xl bg-slate-100 relative shadow-inner overflow-hidden">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                        </div>
                    ) : (
                        <TableMap tables={tables} onTableClick={handleTableClick} />
                    )}
                </div>
            </main>

            {selectedTable && (
                <>
                    <OpenTableModal
                        isOpen={openModalType === 'OPEN'}
                        onClose={handleCloseModal}
                        tableId={selectedTable.id}
                        tableNumber={selectedTable.number}
                    />
                    <TableDetailsModal
                        isOpen={openModalType === 'DETAILS'}
                        onClose={handleCloseModal}
                        tableId={selectedTable.id}
                        tableNumber={selectedTable.number}
                        onNewOrder={() => setOpenModalType('OPEN')} // Redirect occupied -> add new person
                    />
                </>
            )}
        </div>
    );
}
