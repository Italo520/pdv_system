'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { OpenOrderModal } from "@/components/pdv/open-order-modal";

interface AddOrderButtonProps {
    tableId: string;
    tableNumber: number;
}

export function AddOrderButton({ tableId, tableNumber }: AddOrderButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="text-center p-6 w-full" onClick={() => setIsModalOpen(true)}>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Adicionar Pessoa</h3>
                <p className="text-sm text-muted-foreground">Nova comanda para esta mesa</p>
            </div>

            <OpenOrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tableId={tableId}
                tableNumber={tableNumber.toString()}
            />
        </>
    );
}
