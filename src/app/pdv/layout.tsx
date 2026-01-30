"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PDVLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="pro-theme min-h-screen bg-background text-foreground selection:bg-primary/30">
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
