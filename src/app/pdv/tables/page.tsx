"use client";

import { Sidebar } from "@/components/pdv/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Users, Clock, ArrowRight, Filter, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSocketMock } from "@/hooks/use-socket-mock";

const tableStatus = {
    available: { label: "Livre", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    occupied: { label: "Ocupada", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    reserved: { label: "Reservada", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    attention: { label: "Pendente", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
};

const initialTables = [
    { id: "01", status: "occupied", capacity: 4, orders: 3, total: 125.80, time: "45min" },
    { id: "02", status: "available", capacity: 2, orders: 0, total: 0, time: "-" },
    { id: "03", status: "occupied", capacity: 6, orders: 5, total: 342.00, time: "1h 10min" },
    { id: "04", status: "attention", capacity: 4, orders: 2, total: 89.90, time: "15min" },
    { id: "05", status: "reserved", capacity: 8, orders: 0, total: 0, time: "-" },
    { id: "06", status: "available", capacity: 4, orders: 0, total: 0, time: "-" },
    { id: "07", status: "occupied", capacity: 2, orders: 1, total: 45.00, time: "20min" },
    { id: "08", status: "occupied", capacity: 4, orders: 4, total: 210.50, time: "55min" },
    { id: "09", status: "available", capacity: 4, orders: 0, total: 0, time: "-" },
    { id: "10", status: "attention", capacity: 6, orders: 1, total: 12.00, time: "5min" },
    { id: "11", status: "available", capacity: 2, orders: 0, total: 0, time: "-" },
    { id: "12", status: "occupied", capacity: 4, orders: 3, total: 156.40, time: "30min" },
    { id: "13", status: "available", capacity: 4, orders: 0, total: 0, time: "-" },
    { id: "14", status: "occupied", capacity: 2, orders: 1, total: 85.00, time: "20min" },
    { id: "15", status: "available", capacity: 4, orders: 0, total: 0, time: "-" },
    { id: "16", status: "available", capacity: 2, orders: 0, total: 0, time: "-" },
];

export default function TablesPage() {
    const liveTables = useSocketMock(initialTables);

    const sortedTables = [...liveTables].sort((a, b) => {
        const idA = parseInt(a.id, 10);
        const idB = parseInt(b.id, 10);
        if (!isNaN(idA) && !isNaN(idB)) {
            return idA - idB;
        }
        return a.id.localeCompare(b.id);
    });

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
                            <Button size="sm" className="btn-primary h-10 px-4 rounded-xl text-xs uppercase tracking-tight gap-1.5 shadow-lg shadow-primary/10">
                                <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Nova Mesa</span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex gap-1.5 flex-wrap">
                            {Object.entries(tableStatus).map(([key, value]) => (
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
                            <motion.div
                                layout
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
                            >
                                {sortedTables.map((table) => {
                                    const status = tableStatus[table.status as keyof typeof tableStatus];
                                    return (
                                        <motion.div
                                            key={table.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        >
                                            <TableCard table={table} status={status} />
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </ScrollArea>
                </div>
            </main>
        </div>
    );
}

function TableCard({ table, status }: { table: any, status: any }) {
    return (
        <Card className={cn(
            "card-base !p-0 overflow-hidden bg-card hover:bg-card/80 border-border/50 group h-full flex flex-col min-h-[160px] transition-all cursor-pointer hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 active:scale-[0.98]"
        )}>
            <div className={cn("h-1 transition-colors w-full shrink-0", status.color.replace('text', 'bg'))} />

            <div className="p-3 flex flex-col h-full gap-2 relative">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-[8px] font-black tracking-widest text-muted-foreground uppercase block mb-0.5 opacity-70">Mesa</span>
                        <h3 className="text-2xl font-black tracking-tighter text-foreground italic leading-none font-display">{table.id}</h3>
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
                        <p className="font-bold text-foreground text-xs">{table.capacity}</p>
                    </div>
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-2.5 h-2.5" />
                            <span className="text-[8px] font-black uppercase tracking-widest opacity-70">Tempo</span>
                        </div>
                        <p className="font-bold text-foreground text-xs">{table.time}</p>
                    </div>
                </div>

                <div className="space-y-2 mt-auto">
                    <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                            <span className="text-[8px] font-bold py-0 px-1 bg-secondary rounded text-muted-foreground uppercase tracking-widest inline-block opacity-80">R$</span>
                            <p className="text-sm font-black text-foreground italic tracking-tight">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(table.total).replace('R$', '').trim()}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-70">Itens</span>
                            <span className="font-mono text-primary font-bold text-xs">{table.orders}</span>
                        </div>
                    </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-primary opacity-50" />
                </div>
            </div>
        </Card>
    );
}
