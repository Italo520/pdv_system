'use client';

import { TableCard } from "./table-card";

type Table = {
    id: string;
    number: number;
    xPosition: number;
    yPosition: number;
    status: string; // Enum actually
    // Add real data props
    currentOrder?: {
        totalAmount: number;
        createdAt: Date;
        peopleCount: number;
    } | null;
};

type TableMapProps = {
    tables: Table[];
    onTableClick: (tableId: string) => void;
};

function formatElapsedTime(startDate?: Date | string) {
    if (!startDate) return undefined;
    const start = new Date(startDate);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60); // minutes
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
}

export function TableMap({ tables, onTableClick }: TableMapProps) {
    if (!tables || tables.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                Nenhuma mesa configurada.
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-slate-50/50 min-h-[500px] overflow-auto border rounded-xl shadow-inner scrollbar-thin">
            {tables.map(table => (
                <div
                    key={table.id}
                    style={{
                        position: 'absolute',
                        left: `${table.xPosition}px`,
                        top: `${table.yPosition}px`
                    }}
                >
                    <TableCard
                        id={table.id}
                        number={table.number}
                        status={table.status as any}
                        totalAmount={table.currentOrder?.totalAmount}
                        peopleCount={table.currentOrder?.peopleCount}
                        elapsedTime={formatElapsedTime(table.currentOrder?.createdAt)}
                        onClick={() => onTableClick(table.id)}
                    />
                </div>
            ))}
        </div>
    );
}
