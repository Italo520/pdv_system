"use client";

import NextImage from "next/image";
import { Plus, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAdd = () => {
        addItem({ id, name, price, image });
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full"
        >
            <Card className="card-base h-full flex flex-col p-3 group overflow-hidden border-border/50 bg-card hover:bg-card/80 hover:border-primary/50 shadow-sm transition-all duration-200">
                <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3 bg-secondary shrink-0">
                    <NextImage
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-x-2 bottom-2 flex justify-between items-end">
                        <Badge className="bg-black/60 backdrop-blur-md text-white border-none text-[9px] uppercase font-bold shadow-sm px-1.5 py-0.5">
                            {category}
                        </Badge>
                    </div>
                </div>

                <div className="flex-1 flex flex-col space-y-2 min-h-0">
                    <h3 className="font-bold text-sm leading-tight text-foreground line-clamp-2">
                        {name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/30">
                        <div className="space-y-0.5">
                            <span className="text-muted-foreground text-[9px] uppercase font-bold tracking-wider block">Valor</span>
                            <span className="text-primary font-bold text-lg tracking-tight">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                            </span>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAdd}
                            className="bg-primary text-primary-foreground p-0 w-9 h-9 flex items-center justify-center rounded-lg shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors cursor-pointer"
                        >
                            <Plus className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
