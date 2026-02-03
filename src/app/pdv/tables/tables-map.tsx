"use client";

import { deleteTable } from "@/actions/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/pdv/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Users, Clock, ArrowRight, Filter, Search, Plus, Armchair, Map, Server, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { OpenTableModal } from "@/components/pdv/open-table-modal";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ClosedOrdersHistory } from "@/components/pdv/closed-orders-history";

const tableStatusConfigs = {
    FREE: { label: "Livre", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    OCCUPIED: { label: "Ocupada", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    RESERVED: { label: "Reservada", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    DISABLED: { label: "Desativada", color: "text-muted", bg: "bg-muted/10", border: "border-muted/20" },
};

// Local type definitions to match serialized data
interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    name: string;
}

interface Order {
    id: string;
    totalAmount: number | string; // Serialized decimal
    status: string;
    items: OrderItem[];
}

interface Table {
    id: string;
    number: number;
    status: string;
    orders?: Order[];
}

interface TablesMapProps {
    initialTables: Table[];
}

export function TablesMap({ initialTables }: TablesMapProps) {
    // ...
    const tables = initialTables;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState<{ id: string, number: string } | null>(null);
    const router = useRouter();

    const sortedTables = [...tables].sort((a, b) => a.number - b.number);

    const handleTableClick = (table: any) => {
        if (table.status === 'OCCUPIED' || (table.orders && table.orders.length > 0)) {
            if (table.orders && table.orders.length === 1) {
                router.push(`/pdv/${table.orders[0].id}`);
            } else {
                router.push(`/pdv/tables/${table.id}`);
            }
        } else {
            setSelectedTable({ id: table.id, number: table.number.toString() });
            setIsModalOpen(true);
        }
    };

    const handleDelete = async (e: MouseEvent, tableId: string) => {
        e.stopPropagation();
        const result = await deleteTable(tableId);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Mesa excluída com sucesso!");
        }
    };

    return (
        <div className="flex bg-background h-screen w-screen overflow-hidden font-sans text-foreground select-none">
            <div className="h-full shrink-0 p-3 z-50 hidden md:block">
                <Sidebar className="w-20" />
            </div>

            <main className="flex-1 flex flex-col gap-3 py-3 pr-3 overflow-hidden max-w-full relative">
                <header className="flex flex-col gap-4 shrink-0 px-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute -inset-3 bg-primary/20 blur-[40px] rounded-full opacity-50 transition-opacity" />
                                <div className="p-3 bg-card rounded-xl text-primary border border-border relative z-10 shadow-lg shadow-primary/5">
                                    <LayoutDashboard className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="space-y-0.5">
                                <h1 className="text-2xl font-black tracking-tighter text-foreground uppercase italic font-display leading-none">Mapa de Mesas</h1>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-primary/10 text-primary border-primary/20 px-1.5 py-0 font-bold text-[9px] tracking-widest uppercase shadow-sm">Setor Principal</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <ClosedOrdersHistory />
                            <Button size="sm" className="btn-primary h-10 px-4 rounded-xl text-xs uppercase tracking-tight gap-1.5 shadow-lg shadow-primary/10" onClick={() => { setSelectedTable(null); setIsModalOpen(true); }}>
                                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Abrir Mesa</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex gap-1.5 flex-wrap">
                            {Object.entries(tableStatusConfigs).map(([key, value]) => (
                                <div
                                    key={key}
                                    className={cn(
                                        "px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 border",
                                        value.bg, value.color, value.border
                                    )}
                                >
                                    <div className={cn("w-1.5 h-1.5 rounded-full", value.color.replace('text', 'bg'))} />
                                    {value.label}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto max-w-xs">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="BUSCAR..."
                                    className="pl-9 h-10 rounded-xl bg-card border-border text-sm font-bold placeholder:text-muted-foreground/50 focus-visible:ring-primary/20 focus-visible:border-primary/50"
                                />
                            </div>
                            <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors shrink-0">
                                <Filter className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 w-full overflow-hidden relative rounded-2xl border border-border/40 bg-card/30">
                    <ScrollArea className="h-full w-full">
                        <div className="p-3 pb-32">
                            {tables.length === 0 ? (
                                <div className="bg-transparent flex flex-col items-center justify-center h-64 text-muted-foreground opacity-50">
                                    <Armchair className="w-12 h-12 mb-2" />
                                    <p>Nenhuma mesa encontrada.</p>
                                    <p className="text-xs">Use "Abrir Mesa" para começar.</p>
                                </div>
                            ) : (
                                <motion.div
                                    layout
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
                                >
                                    {sortedTables.map((table) => {
                                        const statusConfig = tableStatusConfigs[table.status as keyof typeof tableStatusConfigs] || tableStatusConfigs.FREE;
                                        const total = table.orders?.reduce((acc: number, order: any) => acc + Number(order.totalAmount), 0) || 0;
                                        const itemsCount = table.orders?.reduce((acc: number, order: any) => acc + (order.items?.length || 0), 0) || 0;

                                        return (
                                            <motion.div
                                                key={table.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            >
                                                <TableCard
                                                    table={table}
                                                    status={statusConfig}
                                                    total={total}
                                                    itemsCount={itemsCount}
                                                    onClick={() => handleTableClick(table)}
                                                    onDelete={(e) => handleDelete(e, table.id)}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </main>

            <OpenTableModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

function TableCard({ table, status, total, itemsCount, onClick, onDelete }: { table: any, status: any, total: number, itemsCount: number, onClick: () => void, onDelete: (e: any) => void }) {
    return (
        <Card
            onClick={onClick}
            className={cn(
                "card-base !p-0 overflow-hidden bg-card hover:bg-card/80 border-border/50 group h-full flex flex-col min-h-[160px] transition-all cursor-pointer hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 active:scale-[0.98] relative"
            )}>
            {/* Delete Button - Only visible on hover and if status is FREE */}
            {table.status === 'FREE' && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-20"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Mesa {table.number}?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Excluir
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

            <div className={cn("h-1 transition-colors w-full shrink-0", status.color.replace('text', 'bg'))} />

            <div className="p-3 flex flex-col h-full gap-2 relative">
                {/* ... rest of the card content ... */}
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-[8px] font-black tracking-widest text-muted-foreground uppercase block mb-0.5 opacity-70">Mesa</span>
                        <h3 className="text-2xl font-black tracking-tighter text-foreground italic leading-none font-display">{table.number}</h3>
                    </div>
                    <Badge className={cn("rounded-md border font-bold text-[8px] px-1.5 py-0 uppercase shadow-sm h-5 flex items-center", status.bg, status.color, status.border)}>
                        {status.label}
                    </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 border-y border-border/50 py-2">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-2.5 h-2.5" />
                            <span className="text-[8px] font-black uppercase tracking-widest opacity-70">Lugares</span>
                        </div>
                        <p className="font-bold text-foreground text-xs">{4}</p>
                    </div>
                </div>

                <div className="space-y-2 mt-auto">
                    <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                            <span className="text-[8px] font-bold py-0 px-1 bg-secondary rounded text-muted-foreground uppercase tracking-widest inline-block opacity-80">R$</span>
                            <p className="text-sm font-black text-foreground italic tracking-tight">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(total).replace('R$', '').trim()}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-70">Itens</span>
                            <span className="font-mono text-primary font-bold text-xs">{itemsCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
