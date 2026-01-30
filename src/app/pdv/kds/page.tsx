"use client";

import { Sidebar } from "@/components/pdv/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChefHat, Timer, Hash, ArrowRight, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const mockOrders = [
    {
        id: "102", table: "05", waiter: "João", time: "12 min", status: "preparing", items: [
            { name: "Hambúrguer Clássico", qty: 2, notes: "Sem Cebola" },
            { name: "Fritas Rústicas", qty: 1 }
        ]
    },
    {
        id: "103", table: "12", waiter: "Maria", time: "8 min", status: "preparing", items: [
            { name: "Pizza Margherita", qty: 1 },
            { name: "Suco de Laranja", qty: 2 }
        ]
    },
    {
        id: "104", table: "08", waiter: "João", time: "4 min", status: "new", items: [
            { name: "Double Cheese", qty: 1 },
            { name: "Onion Rings", qty: 1 }
        ]
    },
    {
        id: "101", table: "03", waiter: "Maria", time: "25 min", status: "ready", items: [
            { name: "Hambúrguer Clássico", qty: 3 }
        ]
    },
];

export default function KDSPage() {
    return (
        <div className="flex bg-slate-950 h-screen overflow-hidden p-6 gap-6">
            <Sidebar />

            <main className="flex-1 ml-32 flex flex-col gap-10 overflow-hidden">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-sky-500/20 blur-[60px] rounded-full opacity-50 transition-opacity" />
                            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-sky-400 border border-white/5 relative z-10">
                                <ChefHat className="w-14 h-14" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">Laboratório de Produção</h1>
                            <div className="flex items-center gap-4">
                                <Badge className="bg-sky-500/10 text-sky-400 border-sky-500/20 px-3 py-1 font-black text-[10px] tracking-widest uppercase">Motor em Tempo Real</Badge>
                                <span className="text-slate-600 font-bold text-xs uppercase tracking-widest">Taxa de Eficiência: 98.2%</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex bg-slate-900/50 backdrop-blur-xl px-8 py-4 rounded-[2rem] border border-white/5 items-center gap-6">
                            <div className="text-right">
                                <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase block">Pulso Global</span>
                                <span className="font-mono text-2xl text-white font-black tracking-tighter italic">12:45:32</span>
                            </div>
                            <div className="w-4 h-4 bg-sky-500 rounded-full animate-ping opacity-75" />
                        </div>
                        <Button variant="outline" className="h-20 w-20 rounded-[2rem] bg-slate-900 border-white/5 text-slate-500 hover:text-white">
                            <RefreshCw className="w-8 h-8" />
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 flex-1 overflow-hidden">
                    {[
                        { label: "Entrada", status: "new", color: "text-amber-500", glow: "shadow-amber-500/20" },
                        { label: "Preparando", status: "preparing", color: "text-sky-400", glow: "shadow-sky-400/20" },
                        { label: "Pronto para Entrega", status: "ready", color: "text-emerald-500", glow: "shadow-emerald-500/20" }
                    ].map((col) => {
                        const ordersInCol = mockOrders.filter(o => {
                            if (col.status === "new") return o.status === "new";
                            if (col.status === "preparing") return o.status === "preparing";
                            return o.status === "ready";
                        });

                        return (
                            <section key={col.label} className="flex flex-col gap-8">
                                <div className="flex items-center justify-between px-6">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-1.5 h-6 rounded-full", col.color.replace('text', 'bg'))} />
                                        <h2 className={cn("font-black text-sm uppercase tracking-[0.4em]", col.color)}>{col.label}</h2>
                                    </div>
                                    <span className="font-black text-2xl text-slate-700 italic">{ordersInCol.length}</span>
                                </div>

                                <ScrollArea className="flex-1 pr-4">
                                    <div className="flex flex-col gap-10 pb-10">
                                        <AnimatePresence mode="popLayout">
                                            {ordersInCol.map((order) => (
                                                <motion.div
                                                    key={order.id}
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.8, x: 50 }}
                                                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                                >
                                                    <Card className="ocean-card group border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
                                                        <div className="space-y-8">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                                                                        <Hash className="w-3 h-3" />
                                                                        <span className="text-[9px] font-black tracking-[0.2em] uppercase">Setor</span>
                                                                    </div>
                                                                    <h3 className="font-black text-7xl tracking-tighter text-white italic leading-none">{order.table}</h3>
                                                                </div>
                                                                <div className="space-y-4 text-right">
                                                                    <div className="inline-flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/5">
                                                                        <Timer className={cn("w-5 h-5", parseInt(order.time) > 20 ? "text-rose-500 animate-pulse" : "text-sky-400")} />
                                                                        <span className="font-mono font-black text-xl text-white italic tracking-tighter">{order.time}</span>
                                                                    </div>
                                                                    <p className="text-[10px] text-slate-600 font-extrabold uppercase tracking-widest">ID #{order.id} • {order.waiter}</p>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-6 border-y border-white/5 py-10">
                                                                {order.items.map((item, idx) => (
                                                                    <div key={idx} className="flex gap-6 items-start">
                                                                        <div className="text-3xl font-black text-sky-400 italic bg-sky-500/10 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shrink-0">
                                                                            {item.qty}
                                                                        </div>
                                                                        <div className="space-y-2 pt-1">
                                                                            <p className="font-extrabold text-2xl text-slate-100 uppercase tracking-tighter leading-none">{item.name}</p>
                                                                            {item.notes && (
                                                                                <div className="flex items-center gap-2 text-rose-500">
                                                                                    <AlertTriangle className="w-4 h-4 shrink-0" />
                                                                                    <p className="text-xs uppercase font-black tracking-widest animate-pulse">{item.notes}</p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="pt-2">
                                                                {order.status === 'new' && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02, x: 5 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        className="w-full h-20 rounded-[2rem] font-black text-xl uppercase tracking-tighter bg-white text-slate-950 flex items-center justify-center gap-4 shadow-2xl transition-all"
                                                                    >
                                                                        Inicializar <ArrowRight className="w-6 h-6" />
                                                                    </motion.button>
                                                                )}
                                                                {order.status === 'preparing' && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02, x: 5 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        className="w-full h-20 rounded-[2rem] font-black text-xl uppercase tracking-tighter bg-sky-500 text-white flex items-center justify-center gap-4 shadow-2xl shadow-sky-500/40 transition-all group"
                                                                    >
                                                                        Confirmar Preparo <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                                                    </motion.button>
                                                                )}
                                                                {order.status === 'ready' && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        className="w-full h-20 rounded-[2rem] font-black text-xl uppercase tracking-tighter border-2 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 flex items-center justify-center gap-4 transition-all"
                                                                    >
                                                                        <CheckCircle2 className="w-7 h-7" /> Entrega Realizada
                                                                    </motion.button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </ScrollArea>
                            </section>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
