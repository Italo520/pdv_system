"use client";

import { Home, UtensilsCrossed, LayoutDashboard, Settings, LogOut, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
    { icon: Home, label: "Início", href: "/pdv" },
    { icon: LayoutDashboard, label: "Mesas", href: "/pdv/tables" },
    { icon: UtensilsCrossed, label: "Cozinha", href: "/pdv/kds" },
    { icon: Package, label: "Estoque", href: "/pdv/inventory" },
    { icon: Settings, label: "Sistema", href: "/pdv/settings" },
];

export function Sidebar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <aside className={cn(
            "w-24 flex flex-col items-center py-8 bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl z-50 shadow-2xl h-full",
            className
        )}>
            <div className="mb-10 relative group cursor-default">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative p-3 bg-primary rounded-2xl shadow-lg shadow-primary/30 transform group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-6 w-full px-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative flex justify-center"
                        >
                            <div className={cn(
                                "p-3 rounded-2xl transition-all duration-300 relative z-10 w-full flex justify-center",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            )}>
                                <item.icon className="w-6 h-6" />
                            </div>

                            {isActive && (
                                <motion.div
                                    layoutId="nav-active-indicator"
                                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                />
                            )}

                            <span className="absolute left-full ml-4 px-3 py-2 bg-popover text-popover-foreground text-xs font-bold tracking-wide uppercase rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[60] border border-border shadow-xl translate-x-2 group-hover:translate-x-0">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <button className="p-3 rounded-2xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-300 cursor-pointer">
                <LogOut className="w-6 h-6" />
            </button>
        </aside>
    );
}
