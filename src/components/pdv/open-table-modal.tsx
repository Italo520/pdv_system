"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { openOrder } from "@/actions/order"
import { Loader2, Users, UserPlus } from "lucide-react"
import { toast } from "sonner"

interface OpenTableModalProps {
    isOpen: boolean
    onClose: () => void
    tableId?: string
    tableNumber?: number
}

type Mode = 'SELECT_TYPE' | 'UNIQUE' | 'INDIVIDUAL';

export function OpenTableModal({ isOpen, onClose, tableId, tableNumber }: OpenTableModalProps) {
    const [mode, setMode] = useState<Mode>('SELECT_TYPE')
    const [customerName, setCustomerName] = useState("")
    const [peopleCount, setPeopleCount] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (isOpen) {
            setMode('SELECT_TYPE')
            setCustomerName("")
            setPeopleCount(1)
        }
    }, [isOpen])

    const handleOpenOrder = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!tableId || !tableNumber) return;

        setIsLoading(true)
        try {
            const finalName = mode === 'UNIQUE'
                ? `Mesa ${tableNumber}`
                : customerName;

            const order = await openOrder({
                tableId,
                tableNumber,
                waiterId: 'current-user-id', // handled in backend for now
                customerName: finalName,
                peopleCount: peopleCount
            });

            toast.success("Mesa aberta com sucesso!");
            onClose();
            router.push(`/pdv/orders/${order.id}`); // Navigate to order screen
        } catch (error) {
            console.error(error)
            toast.error("Erro ao abrir mesa.");
        } finally {
            setIsLoading(false)
        }
    }

    const title = mode === 'SELECT_TYPE' ? "Abrir Mesa" :
        mode === 'UNIQUE' ? "Comanda Única" : "Comanda Individual";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title} - Mesa {tableNumber}</DialogTitle>
                    <DialogDescription>
                        {mode === 'SELECT_TYPE' && "Escolha como deseja iniciar o atendimento."}
                        {mode === 'UNIQUE' && "Uma única comanda para toda a mesa."}
                        {mode === 'INDIVIDUAL' && "Comanda para uma pessoa específica."}
                    </DialogDescription>
                </DialogHeader>

                {mode === 'SELECT_TYPE' && (
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <Button
                            variant="outline"
                            className="h-24 flex flex-col gap-2 hover:bg-slate-50 hover:border-emerald-500"
                            onClick={() => setMode('UNIQUE')}
                        >
                            <Users className="h-8 w-8 text-emerald-500" />
                            <span className="font-semibold">Comanda Única</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-24 flex flex-col gap-2 hover:bg-slate-50 hover:border-blue-500"
                            onClick={() => setMode('INDIVIDUAL')}
                        >
                            <UserPlus className="h-8 w-8 text-blue-500" />
                            <span className="font-semibold">Individual</span>
                        </Button>
                    </div>
                )}

                {mode === 'UNIQUE' && (
                    <form onSubmit={handleOpenOrder}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="people" className="text-right">
                                    Pessoas
                                </Label>
                                <Input
                                    id="people"
                                    type="number"
                                    min={1}
                                    value={peopleCount}
                                    onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                                    className="col-span-3"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setMode('SELECT_TYPE')}>
                                Voltar
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Criar Comanda
                            </Button>
                        </DialogFooter>
                    </form>
                )}

                {mode === 'INDIVIDUAL' && (
                    <form onSubmit={handleOpenOrder}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nome
                                </Label>
                                <Input
                                    id="name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Ex: João"
                                    autoFocus
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setMode('SELECT_TYPE')}>
                                Voltar
                            </Button>
                            <Button type="submit" disabled={isLoading || !customerName}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Criar Comanda
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
