"use client";

import { Sidebar } from "@/components/pdv/sidebar";
import { ProductCard } from "@/components/pdv/product-card";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, User, CreditCard, Receipt, Filter, ChevronRight, LayoutGrid, CircleUser, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["Todos", "Hambúrgueres", "Pizzas", "Bebidas", "Sobremesas", "Entradas"];

const products = [
    { name: "Hambúrguer Clássico", price: 32.90, category: "Hambúrgueres", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
    { name: "Pizza Margherita", price: 55.00, category: "Pizzas", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80" },
    { name: "Coca-Cola 350ml", price: 7.00, category: "Bebidas", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
    { name: "Fritas Rústicas", price: 18.00, category: "Entradas", image: "https://images.unsplash.com/photo-1573016608964-1449ae37f745?w=400&q=80" },
    { name: "Double Cheese", price: 42.90, category: "Hambúrgueres", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80" },
    { name: "Suco de Laranja", price: 12.00, category: "Bebidas", image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400&q=80" },
    { name: "Petit Gateau", price: 24.00, category: "Sobremesas", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
    { name: "Onion Rings", price: 20.00, category: "Entradas", image: "https://images.unsplash.com/photo-1639024471283-035188835118?w=400&q=80" },
];

export default function PDVPage() {
    return (
        <div className="flex bg-slate-950 h-screen overflow-hidden p-6 gap-6">
            <Sidebar />

            <main className="flex-1 ml-32 flex gap-6 overflow-hidden">
                {/* Lado Esquerdo: Seleção de Produtos */}
                <section className="flex-[1.5] flex flex-col gap-8 overflow-hidden">
                    <header className="flex flex-col gap-10">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic">Terminal PDV</h1>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
                                    <span className="text-xs font-black tracking-widest uppercase">Sistema Operacional • Estação 01</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" className="h-16 w-16 rounded-3xl bg-slate-900 border-white/5 text-slate-400 group">
                                    <LayoutGrid className="w-6 h-6 group-hover:text-sky-400 transition-colors" />
                                </Button>
                                <div className="h-16 px-6 bg-slate-900 rounded-3xl border border-white/5 flex items-center gap-4 text-slate-300">
                                    <CircleUser className="w-8 h-8 text-sky-400" />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-tighter leading-none">Operador</span>
                                        <span className="font-bold">ITALO S.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-700 group-focus-within:text-sky-400 transition-colors" />
                                <Input
                                    placeholder="PESQUISAR CÓDIGO OU NOME DO PRODUTO..."
                                    className="pl-16 h-20 rounded-[2rem] bg-slate-900/50 border-white/5 text-2xl font-black placeholder:text-slate-800 focus-visible:ring-sky-500/30 sky-glow shadow-2xl uppercase tracking-tighter"
                                />
                            </div>
                            <Button className="h-20 w-20 rounded-[2rem] bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20">
                                <Filter className="w-8 h-8" />
                            </Button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                            {categories.map((cat, i) => (
                                <button
                                    key={cat}
                                    className={cn(
                                        "px-10 py-5 rounded-3xl text-sm font-black transition-all duration-500 whitespace-nowrap uppercase tracking-widest",
                                        i === 0
                                            ? "bg-gradient-to-br from-sky-400 to-indigo-600 text-white shadow-[0_20px_40px_-10px_rgba(56,189,248,0.4)]"
                                            : "bg-slate-900/50 text-slate-500 hover:text-white hover:bg-slate-800 border border-white/5"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </header>

                    <ScrollArea className="flex-1 -mx-4 px-4 pr-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8 pb-10"
                        >
                            {products.map((product) => (
                                <ProductCard key={product.name} {...product} />
                            ))}
                        </motion.div>
                    </ScrollArea>
                </section>

                {/* Lado Direito: Painel de Execução */}
                <aside className="flex-1 bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] flex flex-col shadow-2xl overflow-hidden">
                    <header className="p-10 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                        <div className="flex items-center justify-between mb-10">
                            <div className="space-y-2">
                                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-sky-400 flex items-center gap-2">
                                    <div className="w-1 h-3 bg-sky-400 rounded-full" /> Ordem de Execução
                                </span>
                                <h2 className="font-black text-5xl tracking-tighter text-white uppercase italic">Sessão #245</h2>
                            </div>
                            <div className="px-5 py-2 bg-slate-900 rounded-2xl border border-white/5 text-slate-400 font-extrabold text-xs tracking-widest uppercase">
                                Mesa 12
                            </div>
                        </div>

                        <div className="bg-slate-950/50 p-6 rounded-[2rem] border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Cliente Alvo</span>
                                    <span className="font-extrabold text-white text-lg">Italo Santos</span>
                                </div>
                            </div>
                            <Button variant="ghost" className="text-slate-500 hover:text-white">Editar</Button>
                        </div>
                    </header>

                    <ScrollArea className="flex-1 p-10">
                        <div className="flex flex-col gap-10 text-center py-20">
                            <div className="relative mx-auto">
                                <div className="absolute inset-0 bg-sky-500/20 blur-[120px] rounded-full" />
                                <ShoppingBag className="w-32 h-32 text-slate-800 relative z-10 mx-auto opacity-40 shrink-0" />
                            </div>
                            <div className="space-y-4">
                                <p className="text-white font-black text-3xl uppercase tracking-tighter italic">Fila Vazia</p>
                                <p className="text-slate-500 font-bold max-w-xs mx-auto text-sm leading-relaxed">Sistema aguardando entrada de dados. Selecione unidades da grade do terminal para popular a execução atual.</p>
                            </div>
                        </div>
                    </ScrollArea>

                    <footer className="p-10 bg-black/40 border-t border-white/5 backdrop-blur-3xl space-y-10">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-slate-500 px-4">
                                <span className="font-black text-[11px] uppercase tracking-widest">Base Total</span>
                                <span className="font-mono text-slate-300 text-lg">R$ 0,00</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-500 px-4">
                                <span className="font-black text-[11px] uppercase tracking-widest">Taxa de Serviço</span>
                                <span className="font-mono text-slate-300 text-lg">R$ 0,00</span>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-slate-900 p-8 rounded-[2.5rem] border border-white/10 flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-black tracking-[0.3em] text-sky-400">Total a Pagar</span>
                                    <div className="text-white font-black text-6xl tracking-tighter italic">R$ 0,00</div>
                                </div>
                                <ChevronRight className="w-12 h-12 text-slate-700" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <Button variant="outline" className="h-20 rounded-[2rem] bg-slate-900 border-white/10 text-white font-black text-xl uppercase tracking-tighter gap-4 hover:bg-slate-800 transition-all">
                                <Receipt className="w-8 h-8 text-slate-600" /> Imprimir
                            </Button>
                            <Button className="h-20 rounded-[2rem] bg-gradient-to-br from-sky-400 to-indigo-600 text-white font-black text-2xl uppercase tracking-tighter gap-4 shadow-2xl shadow-sky-500/30 hover:scale-[1.02] transition-all">
                                Finalizar <ArrowRight className="w-8 h-8" />
                            </Button>
                        </div>
                    </footer>
                </aside>
            </main>
        </div>
    );
}
