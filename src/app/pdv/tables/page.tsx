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

const tableStatus = {
    available: { label: "Livre", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    occupied: { label: "Ocupada", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
    reserved: { label: "Reservada", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    attention: { label: "Pendente", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
};

const mockTables = [
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
];

export default function TablesPage() {
    return (
        <div className="flex bg-slate-950 h-screen overflow-hidden p-6 gap-6">
            <Sidebar />

            <main className="flex-1 ml-32 flex flex-col gap-10 overflow-hidden">
                <header className="flex flex-col gap-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-10">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-sky-500/20 blur-[60px] rounded-full opacity-50 transition-opacity" />
                                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-sky-400 border border-white/5 relative z-10">
                                    <LayoutDashboard className="w-14 h-14" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">Mapa de Mesas</h1>
                                <div className="flex items-center gap-4">
                                    <Badge className="bg-sky-500/10 text-sky-400 border-sky-500/20 px-3 py-1 font-black text-[10px] tracking-widest uppercase">Setor Principal</Badge>
                                    <span className="text-slate-600 font-bold text-xs uppercase tracking-widest">12 Mesas Ativas</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-slate-900/50 backdrop-blur-xl px-10 py-5 rounded-[2rem] border border-white/5 flex items-center gap-10">
                                <div className="text-center">
                                    <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase block mb-1">Ocupação</span>
                                    <span className="font-mono text-3xl text-white font-black tracking-tighter italic">58%</span>
                                </div>
                                <div className="w-px h-10 bg-white/5" />
                                <div className="text-center">
                                    <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase block mb-1">Clientes</span>
                                    <span className="font-mono text-3xl text-sky-400 font-black tracking-tighter italic">24</span>
                                </div>
                            </div>
                            <Button className="h-24 px-10 rounded-[2.5rem] bg-gradient-to-br from-sky-400 to-indigo-600 text-white font-black text-xl uppercase tracking-tighter gap-4 shadow-2xl shadow-sky-500/30">
                                <Plus className="w-8 h-8" /> Nova Mesa
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-6">
                        <div className="flex gap-4">
                            {Object.entries(tableStatus).map(([key, value]) => (
                                <button
                                    key={key}
                                    className={cn(
                                        "px-8 py-4 rounded-2xl text-[11px] font-black transition-all duration-500 uppercase tracking-widest flex items-center gap-3 border",
                                        value.bg, value.color, value.border
                                    )}
                                >
                                    <div className={cn("w-2 h-2 rounded-full", value.color.replace('text', 'bg'))} />
                                    {value.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4 flex-1 max-w-xl">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700 group-focus-within:text-sky-400 transition-colors" />
                                <Input
                                    placeholder="BUSCAR MESA..."
                                    className="pl-14 h-16 rounded-2xl bg-slate-900/50 border-white/5 text-lg font-black placeholder:text-slate-800 focus-visible:ring-sky-500/30"
                                />
                            </div>
                            <Button variant="outline" className="h-16 w-16 rounded-2xl bg-slate-900 border-white/5 text-slate-500">
                                <Filter className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </header>

                <ScrollArea className="flex-1 -mx-4 px-4 pb-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8 pr-4"
                    >
                        {mockTables.map((table) => {
                            const status = tableStatus[table.status as keyof typeof tableStatus];
                            return (
                                <motion.div
                                    key={table.id}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Card className="ocean-card group border-none !p-0 overflow-hidden bg-slate-900/40">
                                        <div className={cn("h-2 transition-colors", status.color.replace('text', 'bg'))} />

                                        <div className="p-8 space-y-8">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase block mb-2">Mesa</span>
                                                    <h3 className="text-6xl font-black tracking-tighter text-white italic leading-none">{table.id}</h3>
                                                </div>
                                                <Badge className={cn("rounded-xl border-none font-black text-[10px] px-3 py-1", status.bg, status.color)}>
                                                    {status.label}
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Users className="w-3 h-3" />
                                                        <span className="text-[9px] font-black uppercase tracking-widest">Lugares</span>
                                                    </div>
                                                    <p className="font-extrabold text-white">{table.capacity}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Clock className="w-3 h-3" />
                                                        <span className="text-[9px] font-black uppercase tracking-widest">Tempo</span>
                                                    </div>
                                                    <p className="font-extrabold text-white">{table.time}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between items-end">
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] font-black py-1 px-3 bg-white/5 rounded-lg text-slate-500 uppercase tracking-widest inline-block">Consumo</span>
                                                        <p className="text-2xl font-black text-white italic tracking-tighter">
                                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(table.total)}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-[9px] font-black text-slate-700 uppercase">Itens</span>
                                                        <span className="font-mono text-sky-400 font-bold">{table.orders}</span>
                                                    </div>
                                                </div>

                                                <Button className={cn(
                                                    "w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all",
                                                    table.status === 'available'
                                                        ? "bg-white text-slate-950 hover:bg-slate-200"
                                                        : "bg-slate-800 text-white hover:bg-slate-700 border border-white/5"
                                                )}>
                                                    {table.status === 'available' ? 'Abrir Mesa' : 'Ver Detalhes'}
                                                    <ArrowRight className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </ScrollArea>
            </main>
        </div>
    );
}
