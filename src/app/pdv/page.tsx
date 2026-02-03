"use client";

import { Sidebar } from "@/components/pdv/sidebar";
import { ProductCard } from "@/components/pdv/product-card";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, User, Receipt, Filter, ChevronRight, LayoutGrid, CircleUser, ArrowRight, Minus, Plus, Trash2, ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import NextImage from "next/image";

const categories = ["Todos", "Hambúrgueres", "Pizzas", "Bebidas", "Sobremesas", "Entradas"];

const products = [
    { id: "p1", name: "Hambúrguer Clássico", price: 32.90, category: "Hambúrgueres", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
    { id: "p2", name: "Pizza Margherita", price: 55.00, category: "Pizzas", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80" },
    { id: "p3", name: "Coca-Cola 350ml", price: 7.00, category: "Bebidas", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
    { id: "p4", name: "Fritas Rústicas", price: 18.00, category: "Entradas", image: "https://images.unsplash.com/photo-1573016608964-1449ae37f745?w=400&q=80" },
    { id: "p5", name: "Double Cheese", price: 42.90, category: "Hambúrgueres", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80" },
    { id: "p6", name: "Suco de Laranja", price: 12.00, category: "Bebidas", image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400&q=80" },
    { id: "p7", name: "Petit Gateau", price: 24.00, category: "Sobremesas", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
    { id: "p8", name: "Onion Rings", price: 20.00, category: "Entradas", image: "https://images.unsplash.com/photo-1639024471283-035188835118?w=400&q=80" },
    { id: "p9", name: "Milkshake Morango", price: 18.00, category: "Sobremesas", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc69d?w=400&q=80" },
    { id: "p10", name: "Água Mineral", price: 4.00, category: "Bebidas", image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400&q=80" },
];

export default function PDVPage() {
    const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();
    const [isClient, setIsClient] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [isCartOpen, setIsCartOpen] = useState(true);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const subtotal = isClient ? getTotal() : 0;
    const serviceFee = subtotal * 0.1;
    const total = subtotal + serviceFee;

    const filteredProducts = selectedCategory === "Todos"
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="flex bg-background h-screen w-screen overflow-hidden font-sans text-foreground selection:bg-primary/30">
            {/* Sidebar Fixa */}
            <div className="h-full shrink-0 p-3 z-50">
                <Sidebar className="w-20" />
            </div>

            <main className="flex-1 flex gap-4 py-3 pr-3 overflow-hidden max-w-full relative">

                {/* Product Section */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden min-w-0">
                    <header className="flex flex-col gap-4 shrink-0">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground uppercase italic font-display">
                                        Terminal PDV
                                    </h1>
                                    {!isCartOpen && (
                                        <Button
                                            onClick={() => setIsCartOpen(true)}
                                            className="h-9 w-9 md:h-10 md:w-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all ml-2 border border-primary/20"
                                        >
                                            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                                        </Button>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_6px_rgba(59,130,246,0.5)]" />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Estação 01 • Online</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex h-12 px-4 bg-card rounded-xl border border-border/50 items-center gap-3 text-muted-foreground shadow-sm">
                                    <CircleUser className="w-6 h-6 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-tighter leading-none text-muted-foreground/70">Operador</span>
                                        <span className="font-bold text-foreground text-xs">ITALO S.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search & Filters */}
                        <div className="flex gap-2">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="PESQUISAR CÓDIGO OU NOME..."
                                    className="pl-10 h-12 rounded-xl bg-card border-border text-base font-bold placeholder:text-muted-foreground/50 focus-visible:ring-primary/20 focus-visible:border-primary/50 shadow-sm uppercase tracking-tight"
                                />
                            </div>
                            <Button className="btn-primary h-12 w-12 p-0 rounded-xl shadow-lg shadow-primary/20 shrink-0">
                                <Filter className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mask-fade-right">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 whitespace-nowrap uppercase tracking-wide border shrink-0",
                                        selectedCategory === cat
                                            ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                                            : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground hover:border-primary/30"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </header>

                    {/* Scrollable Product Grid */}
                    <div className="flex-1 relative -mr-3 pr-3 overflow-hidden">
                        <ScrollArea className="h-full w-full pr-3">
                            <motion.div
                                key={selectedCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                classMode="wait"
                                className={cn(
                                    "grid gap-3 pb-20",
                                    isCartOpen
                                        ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                                        : "grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
                                )}
                            >
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </motion.div>
                        </ScrollArea>
                    </div>
                </div>

                {/* Collapsible Cart Aside */}
                <AnimatePresence mode="wait">
                    {isCartOpen && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 380, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="shrink-0 h-full bg-card/60 backdrop-blur-2xl border border-border/50 rounded-[2rem] flex flex-col shadow-2xl shadow-black/50 overflow-hidden relative z-40 hidden lg:flex"
                        >
                            {/* Close Button */}
                            <Button
                                onClick={() => setIsCartOpen(false)}
                                variant="ghost"
                                className="absolute top-4 right-4 z-50 h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>

                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

                            <header className="p-6 border-b border-border/30 bg-gradient-to-b from-card/50 to-transparent shrink-0">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="space-y-0.5">
                                        <span className="text-[9px] uppercase font-black tracking-[0.2em] text-primary flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> Ordem Atual
                                        </span>
                                        <h2 className="font-display font-black text-3xl tracking-tighter text-foreground uppercase italic">#245</h2>
                                    </div>
                                    <div className="px-3 py-1 bg-secondary/50 rounded-lg border border-border/50 text-muted-foreground font-bold text-[10px] tracking-wider uppercase">
                                        Mesa 12
                                    </div>
                                </div>

                                <div className="bg-secondary/30 p-3 rounded-xl border border-border/30 flex items-center justify-between group hover:border-primary/20 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Cliente</span>
                                            <span className="font-bold text-foreground text-sm">Italo Santos</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 text-[10px] font-bold uppercase tracking-wider px-2" onClick={clearCart}>
                                        Limpar
                                    </Button>
                                </div>
                            </header>

                            <div className="flex-1 min-h-0 overflow-hidden">
                                <ScrollArea className="h-full w-full px-4">
                                    <AnimatePresence mode="popLayout">
                                        {isClient && items.length > 0 ? (
                                            <div className="flex flex-col gap-3 py-4">
                                                {items.map((item) => (
                                                    <motion.div
                                                        key={item.id}
                                                        layout
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                                        className="bg-secondary/40 p-3 rounded-xl border border-border/30 flex items-center gap-3 group hover:border-primary/30 hover:bg-secondary/60 transition-all duration-300 relative overflow-hidden"
                                                    >
                                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-secondary">
                                                            <NextImage src={item.image} alt={item.name} fill className="object-cover" />
                                                        </div>

                                                        <div className="flex-1 space-y-0.5 min-w-0">
                                                            <h4 className="font-bold text-foreground uppercase tracking-tight text-xs line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h4>
                                                            <p className="text-primary font-mono font-bold text-xs">
                                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-col items-center gap-1.5 shrink-0">
                                                            <div className="flex items-center gap-1.5 bg-background/50 px-1.5 py-1 rounded-lg border border-border/30">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    className="text-muted-foreground hover:text-primary transition-colors p-0.5"
                                                                >
                                                                    <Minus className="w-3 h-3" />
                                                                </button>
                                                                <span className="text-foreground font-mono font-bold text-xs w-4 text-center">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="text-muted-foreground hover:text-primary transition-colors p-0.5"
                                                                >
                                                                    <Plus className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="absolute top-1 right-1 p-1 text-muted-foreground/30 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4 text-center py-20 items-center justify-center opacity-50">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full" />
                                                    <ShoppingBag className="w-16 h-16 text-muted-foreground relative z-10" />
                                                </div>
                                                <div className="space-y-1 max-w-[180px]">
                                                    <p className="text-foreground font-bold text-base uppercase tracking-tight">Fila Vazia</p>
                                                    <p className="text-muted-foreground text-[10px] leading-relaxed">Selecione itens ao lado para iniciar o pedido.</p>
                                                </div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </ScrollArea>
                            </div>

                            <footer className="p-6 bg-card/90 border-t border-border/50 backdrop-blur-xl space-y-4 shrink-0 z-20">
                                {/* Totals */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center text-muted-foreground px-1">
                                        <span className="font-bold text-[10px] uppercase tracking-wider">Subtotal</span>
                                        <span className="font-mono text-foreground text-xs">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-muted-foreground px-1">
                                        <span className="font-bold text-[10px] uppercase tracking-wider">Taxa (10%)</span>
                                        <span className="font-mono text-foreground text-xs">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(serviceFee)}
                                        </span>
                                    </div>
                                </div>

                                {/* Grand Total */}
                                <div className="relative group cursor-pointer overflow-hidden rounded-xl">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative bg-secondary/30 p-4 flex items-center justify-between border border-border/50 group-hover:border-primary/30 transition-colors">
                                        <div className="space-y-0.5">
                                            <span className="text-[9px] uppercase font-black tracking-[0.2em] text-primary">Total Final</span>
                                            <div className="text-foreground font-display font-black text-3xl tracking-tighter text-glow">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="h-12 rounded-xl border-border/50 text-muted-foreground font-bold text-xs uppercase tracking-wide gap-2 hover:bg-secondary hover:text-foreground hover:border-primary/20 transition-all">
                                        <Receipt className="w-4 h-4" /> Imprimir
                                    </Button>
                                    <Button className="btn-primary h-12 rounded-xl text-base uppercase tracking-tight gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/30">
                                        Finalizar <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </footer>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
