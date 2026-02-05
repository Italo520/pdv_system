"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getOrdersByTable } from "@/actions/order"
import { Loader2, Plus, ArrowRight, DollarSign } from "lucide-react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TableDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    tableId?: string
    tableNumber?: number
    onNewOrder: () => void // Callback to open "New Order" (Individual) flow
}

type OrderSummary = {
    id: string;
    customerName: string | null;
    totalAmount: number | string; // Decimal comes as string often or needs mapping
    status: string;
};

export function TableDetailsModal({ isOpen, onClose, tableId, tableNumber, onNewOrder }: TableDetailsModalProps) {
    const [orders, setOrders] = useState<OrderSummary[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (isOpen && tableId) {
            loadOrders()
        }
    }, [isOpen, tableId])

    const loadOrders = async () => {
        setIsLoading(true)
        try {
            const data = await getOrdersByTable(tableId!)
            setOrders(data as unknown as OrderSummary[])
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar comandas")
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpenOrder = (orderId: string) => {
        onClose();
        router.push(`/pdv/orders/${orderId}`);
    }

    const totalTable = orders.reduce((acc, order) => acc + Number(order.totalAmount), 0);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex justify-between items-center pr-8">
                        <DialogTitle className="text-xl">Mesa {tableNumber}</DialogTitle>
                        <div className="flex flex-col items-end">
                            <span className="text-sm text-muted-foreground">Total da Mesa</span>
                            <span className="text-lg font-bold text-emerald-600">R$ {totalTable.toFixed(2)}</span>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-2">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium">Comandas Abertas ({orders.length})</span>
                        <Button size="sm" variant="outline" onClick={() => {
                            onClose();
                            onNewOrder();
                        }}>
                            <Plus className="w-4 h-4 mr-1" />
                            Nova Pessoa
                        </Button>
                    </div>

                    <ScrollArea className="h-[300px] w-full border rounded-md p-2">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center text-slate-400 py-8">
                                Nenhuma comanda aberta.
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {orders.map(order => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-all cursor-pointer group"
                                        onClick={() => handleOpenOrder(order.id)}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">{order.customerName || "Comanda Sem Nome"}</span>
                                            <span className="text-xs text-slate-500">#{order.id.slice(-4)}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-sm">R$ {Number(order.totalAmount).toFixed(2)}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="secondary" className="w-full sm:w-auto" onClick={onClose}>
                        Voltar
                    </Button>
                    {/* Add Pay All button later */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
