"use client";

import { Home, UtensilsCrossed, LayoutDashboard, Settings, LogOut, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
    { icon: Home, label: "Home", href: "/pdv" },
    { icon: LayoutDashboard, label: "Tables", href: "/pdv/tables" },
    { icon: UtensilsCrossed, label: "Kitchen", href: "/pdv/kds" },
    { icon: Package, label: "Stock", href: "/pdv/inventory" },
    { icon: Settings, label: "System", href: "/pdv/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-6 top-6 bottom-6 w-24 flex flex-col items-center py-10 bg-slate-950/60 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] z-50 shadow-2xl">
            <div className="mb-14 relative group">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 bg-sky-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative p-4 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-3xl shadow-xl shadow-sky-500/20 transform group-hover:scale-110 transition-transform">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-10">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative"
                        >
                            <div className={cn(
                                "p-4 rounded-3xl transition-all duration-500 relative z-10",
                                isActive
                                    ? "bg-white/10 text-sky-400 shadow-[inset_0_0_12px_rgba(56,189,248,0.1)]"
                                    : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                            )}>
                                <item.icon className="w-7 h-7" />
                            </div>

                            {isActive && (
                                <motion.div
                                    layoutId="nav-acc-active"
                                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-sky-400 rounded-r-full shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                                />
                            )}

                            <span className="absolute left-full ml-10 px-4 py-2 bg-slate-900 text-slate-100 text-[10px] font-black tracking-widest uppercase rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[60] border border-white/5 shadow-2xl">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <button className="p-4 rounded-3xl text-slate-600 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300">
                <LogOut className="w-7 h-7" />
            </button>
        </aside>
    );
}
