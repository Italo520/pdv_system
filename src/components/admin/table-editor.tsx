'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor, useDraggable } from '@dnd-kit/core';
import { getOrCreateTable, deleteTable, updateTablePosition } from '@/actions/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, GripVertical, Plus } from 'lucide-react';
import { toast } from 'sonner';

type Table = {
    id: string;
    number: number;
    xPosition: number;
    yPosition: number;
    status: string;
};

type TableEditorProps = {
    initialTables: Table[];
};

function DraggableTable({ table, onDelete }: { table: Table; onDelete: (id: string) => void }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: table.id,
        data: { x: table.xPosition, y: table.yPosition },
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: 'absolute' as const,
        left: `${table.xPosition}px`,
        top: `${table.yPosition}px`,
    } : {
        position: 'absolute' as const,
        left: `${table.xPosition}px`,
        top: `${table.yPosition}px`,
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className="w-24 h-24 flex flex-col items-center justify-center cursor-move bg-white shadow-md border-2 border-slate-200 hover:border-blue-500 z-10"
            {...listeners}
            {...attributes}
        >
            <div className="text-xl font-bold">Mesa {table.number}</div>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 mt-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent drag start
                    onDelete(table.id);
                }}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </Card>
    );
}

export function TableEditor({ initialTables }: TableEditorProps) {
    const [tables, setTables] = useState<Table[]>(initialTables);
    const [newTableNumber, setNewTableNumber] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, delta } = event;
        const id = active.id as string;

        // Find current position
        const currentTable = tables.find(t => t.id === id);
        if (!currentTable) return;

        // Calculate new position (snapped to grid 10px optional)
        const newX = Math.max(0, currentTable.xPosition + delta.x);
        const newY = Math.max(0, currentTable.yPosition + delta.y);

        // Optimistic update
        setTables(tables.map(t =>
            t.id === id ? { ...t, xPosition: newX, yPosition: newY } : t
        ));

        // Server update
        const result = await updateTablePosition(id, newX, newY);
        if (result.error) {
            toast.error(result.error);
            // Revert on error
            setTables(tables.map(t =>
                t.id === id ? { ...t, xPosition: currentTable.xPosition, yPosition: currentTable.yPosition } : t
            ));
        }
    };

    const handleAddTable = async () => {
        const num = parseInt(newTableNumber);
        if (isNaN(num)) {
            toast.error("Número inválido");
            return;
        }

        try {
            const newTable = await getOrCreateTable(num);
            // Verify if it's actually new or just returned existing
            if (tables.some(t => t.id === newTable.id)) {
                toast.info(`Mesa ${num} já existe.`);
                return;
            }

            // Should add with default position or let user decide?
            // getOrCreateTable sets 0,0. We will refresh list or just push
            setTables(prev => [...prev, newTable as unknown as Table]);
            setNewTableNumber('');
            toast.success(`Mesa ${num} adicionada`);
        } catch (error) {
            toast.error("Erro ao adicionar mesa");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir esta mesa?")) return;

        const result = await deleteTable(id);
        if (result.success) {
            setTables(prev => prev.filter(t => t.id !== id));
            toast.success("Mesa removida");
        } else {
            toast.error(result.error || "Erro ao remover");
        }
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-4 items-center p-4 bg-white rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold">Configuração do Salão</h2>
                <div className="flex gap-2 items-center ml-auto">
                    <Input
                        type="number"
                        placeholder="Nº Mesa"
                        className="w-32"
                        value={newTableNumber}
                        onChange={e => setNewTableNumber(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddTable()}
                    />
                    <Button onClick={handleAddTable}>
                        <Plus className="mr-2 h-4 w-4" /> Adicionar Mesa
                    </Button>
                </div>
            </div>

            <div className="flex-1 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl relative overflow-hidden min-h-[600px]">
                <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                >
                    {tables.map(table => (
                        <DraggableTable
                            key={table.id}
                            table={table}
                            onDelete={handleDelete}
                        />
                    ))}
                </DndContext>

                {tables.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        Nenhuma mesa configurada. Adicione mesas acima.
                    </div>
                )}
            </div>
            <div className="text-xs text-slate-500 text-center">
                Arraste as mesas para posicioná-las no mapa do salão.
            </div>
        </div>
    );
}
