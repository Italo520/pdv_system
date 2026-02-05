"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { TransferItemsModal } from "./transfer-items-modal";

interface TransferButtonProps {
    orderId: string;
    tableNumber?: string; // Changed to match exact property usage
    items: any[];
}

export function TransferButton({ orderId, tableNumber, items }: TransferButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="h-9 px-3 text-xs uppercase font-bold tracking-tight gap-1.5"
            >
                <ArrowRightLeft className="w-4 h-4" /> Transferir
            </Button>

            <TransferItemsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                sourceOrderId={orderId}
                sourceTableNumber={tableNumber || "?"}
                items={items}
            />
        </>
    );
}
