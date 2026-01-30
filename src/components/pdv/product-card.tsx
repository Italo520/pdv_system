"use client";

import Image from "next/image";
import { Plus, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProductCardProps {
    name: string;
    price: number;
    image: string;
    category: string;
}

export function ProductCard({ name, price, image, category }: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
            <Card className="ocean-card group border-none">
                <div className="relative h-48 w-full rounded-[1.5rem] overflow-hidden mb-6">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-x-3 bottom-3 flex justify-between items-end">
                        <Badge className="bg-slate-900/60 backdrop-blur-xl text-[10px] uppercase tracking-tighter font-extrabold border-white/5 text-slate-200">
                            {category}
                        </Badge>
                        <div className="w-10 h-10 bg-sky-500/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-500">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-extrabold text-xl leading-tight text-slate-100 group-hover:text-sky-400 transition-colors uppercase tracking-tight line-clamp-2">
                        {name}
                    </h3>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="space-y-1">
                            <span className="text-slate-500 text-[9px] uppercase font-black tracking-widest block">Investimento</span>
                            <span className="text-slate-100 font-extrabold text-2xl tracking-tighter">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                            </span>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-lg shadow-sky-500/20 flex items-center justify-center transform hover:rotate-6 transition-all"
                        >
                            <Plus className="w-8 h-8 font-black" />
                        </motion.button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
