"use client";

import { useState, useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Receipt } from "lucide-react";
import { getClosedOrders } from "@/actions/order";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

export function ClosedOrdersHistory() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            getClosedOrders().then(setOrders);
        }
    }, [isOpen]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl text-xs uppercase tracking-tight gap-1.5 shadow-sm border-dashed">
                    <History className="w-4 h-4" /> <span className="hidden sm:inline">Histórico</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <History className="w-5 h-5" />
                        Histórico de Vendas (24h)
                    </SheetTitle>
                    <SheetDescription>
                        Últimos pedidos fechados e finalizados.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-6 h-[calc(100vh-120px)]">
                    <ScrollArea className="h-full pr-4">
                        {orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground opacity-50">
                                <Receipt className="w-10 h-10 mb-2" />
                                <p>Nenhum pedido fechado recentemente.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="flex flex-col gap-2 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="font-mono">
                                                    #{order.id.slice(-4)}
                                                </Badge>
                                                <span className="text-sm font-medium">
                                                    Mesa {order.table?.number || "Balcão"}
                                                </span>
                                            </div>
                                            <span className="text-xs text-muted-foreground capitalize">
                                                {format(new Date(order.updatedAt), "HH:mm • dd MMM", { locale: ptBR })}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="text-sm text-muted-foreground">
                                                <p>{order.customerName}</p>
                                                <p className="text-xs opacity-70">
                                                    Atendido por: {order.waiter?.name || "N/A"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-primary">
                                                    R$ {Number(order.totalAmount).toFixed(2)}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {order.items.length} itens
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    );
}
