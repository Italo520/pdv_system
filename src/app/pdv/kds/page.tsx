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
        <div className="flex bg-background h-screen w-screen overflow-hidden font-sans text-foreground">
            <div className="h-full shrink-0 p-4 md:p-6 z-50">
                <Sidebar />
            </div>

            <main className="flex-1 flex flex-col gap-6 py-4 md:py-6 pr-4 md:pr-6 overflow-hidden max-w-full relative">
                <header className="flex items-center justify-between flex-wrap gap-6 shrink-0">
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-primary/20 blur-[60px] rounded-full opacity-50 transition-opacity" />
                            <div className="p-6 bg-card rounded-3xl text-primary border border-border relative z-10 shadow-lg shadow-primary/10">
                                <ChefHat className="w-10 h-10" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-foreground uppercase italic font-display leading-none">Cozinha (KDS)</h1>
                            <div className="flex items-center gap-4">
                                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-bold text-[10px] tracking-widest uppercase shadow-sm">Tempo Real</Badge>
                                <span className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Eficiência: 98.2%</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex bg-card/50 backdrop-blur-xl px-8 py-4 rounded-3xl border border-border items-center gap-6 shadow-sm">
                            <div className="text-right">
                                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase block">Pulso Global</span>
                                <span className="font-mono text-xl text-foreground font-bold tracking-tighter">12:45:32</span>
                            </div>
                            <div className="w-3 h-3 bg-primary rounded-full animate-ping opacity-75" />
                        </div>
                        <Button variant="outline" className="h-auto w-16 rounded-2xl bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                            <RefreshCw className="w-6 h-6" />
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1 overflow-hidden pb-0 min-h-0">
                    {[
                        { label: "Entrada", status: "new", color: "text-amber-500", glow: "shadow-amber-500/20" },
                        { label: "Preparando", status: "preparing", color: "text-sky-400", glow: "shadow-sky-400/20" },
                        { label: "Pronto", status: "ready", color: "text-emerald-500", glow: "shadow-emerald-500/20" }
                    ].map((col) => {
                        const ordersInCol = mockOrders.filter(o => {
                            if (col.status === "new") return o.status === "new";
                            if (col.status === "preparing") return o.status === "preparing";
                            return o.status === "ready";
                        });

                        return (
                            <section key={col.label} className="flex flex-col gap-6 h-full min-h-0 bg-secondary/20 rounded-3xl p-4 border border-border/30 overflow-hidden">
                                <div className="flex items-center justify-between px-2 shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-1.5 h-5 rounded-full", col.color.replace('text', 'bg'))} />
                                        <h2 className={cn("font-black text-xs uppercase tracking-[0.2em]", col.color)}>{col.label}</h2>
                                    </div>
                                    <span className="font-black text-xl text-muted-foreground">{ordersInCol.length}</span>
                                </div>

                                <ScrollArea className="flex-1 -mr-3 pr-3 h-full">
                                    <div className="flex flex-col gap-4 pb-20">
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
                                                    <Card className="card-base !p-0 border-none shadow-lg bg-card group overflow-hidden">
                                                        <div className="p-6 space-y-6">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                                                        <Hash className="w-3 h-3" />
                                                                        <span className="text-[10px] font-black tracking-[0.2em] uppercase">Mesa</span>
                                                                    </div>
                                                                    <h3 className="font-black text-5xl tracking-tighter text-foreground italic leading-none font-display">{order.table}</h3>
                                                                </div>
                                                                <div className="space-y-3 text-right">
                                                                    <div className="inline-flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-xl border border-border/50">
                                                                        <Timer className={cn("w-4 h-4", parseInt(order.time) > 20 ? "text-destructive animate-pulse" : "text-primary")} />
                                                                        <span className="font-mono font-bold text-lg text-foreground tracking-tight">{order.time}</span>
                                                                    </div>
                                                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">#{order.id} • {order.waiter}</p>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-4 border-y border-border/50 py-6">
                                                                {order.items.map((item, idx) => (
                                                                    <div key={idx} className="flex gap-4 items-start">
                                                                        <div className="text-xl font-black text-primary italic bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center border border-primary/20 shrink-0">
                                                                            {item.qty}
                                                                        </div>
                                                                        <div className="space-y-1 pt-1">
                                                                            <p className="font-bold text-lg text-foreground uppercase tracking-tight leading-none">{item.name}</p>
                                                                            {item.notes && (
                                                                                <div className="flex items-center gap-1.5 text-destructive">
                                                                                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                                                                    <p className="text-[10px] uppercase font-bold tracking-wider animate-pulse">{item.notes}</p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="pt-0">
                                                                {order.status === 'new' && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        className="w-full h-14 rounded-xl font-bold text-sm uppercase tracking-wider bg-foreground text-background flex items-center justify-center gap-3 shadow-md transition-all"
                                                                    >
                                                                        Inicializar <ArrowRight className="w-5 h-5" />
                                                                    </motion.button>
                                                                )}
                                                                {order.status === 'preparing' && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        className="w-full h-14 rounded-xl font-bold text-sm uppercase tracking-wider bg-primary text-primary-foreground flex items-center justify-center gap-3 shadow-lg shadow-primary/20 transition-all group"
                                                                    >
                                                                        Pronto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                                    </motion.button>
                                                                )}
                                                                {order.status === 'ready' && (
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        className="w-full h-14 rounded-xl font-bold text-sm uppercase tracking-wider border-2 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 flex items-center justify-center gap-3 transition-all"
                                                                    >
                                                                        <CheckCircle2 className="w-5 h-5" /> Entregue
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
