"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { openOrder } from "@/actions/order";
import { useRouter } from "next/navigation";
import { Loader2, Users as UsersIcon, User as UserIcon, Utensils } from "lucide-react";

interface OpenOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    tableId: string | null;
    tableNumber?: string; // Optional display number
}

export function OpenOrderModal({ isOpen, onClose, tableId, tableNumber }: OpenOrderModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form states
    const [customerName, setCustomerName] = useState("");
    const [peopleCount, setPeopleCount] = useState("1");
    const [customTableNumber, setCustomTableNumber] = useState("");
    const [waiterId, setWaiterId] = useState("current-user-id"); // In real app, get from session

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setCustomerName("");
            setPeopleCount("1");
            setCustomTableNumber("");
            // waiterId would be reset to current user
        }
    }, [isOpen]);

    const handleOpenOrder = async () => {
        const targetNumber = tableNumber ? parseInt(tableNumber) : parseInt(customTableNumber);

        if (!tableId && !targetNumber) return; // Must have either ID or Number

        setLoading(true);
        try {
            const order = await openOrder({
                tableId: tableId || undefined,
                tableNumber: targetNumber || undefined,
                waiterId,
                customerName: customerName || `Mesa ${targetNumber || tableNumber || tableId}`,
                peopleCount: parseInt(peopleCount) || 1,
            });

            // Redirect to PDV page with new order context
            router.push(`/pdv/${order.id}`);
            onClose();
        } catch (error) {
            console.error("Failed to open order:", error);
            // Here you would show a toast error
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Utensils className="w-5 h-5 text-primary" />
                        Abrir Comanda
                    </DialogTitle>
                    <DialogDescription>
                        {tableId || tableNumber ? (
                            <>Iniciando atendimento para a <strong>Mesa {tableNumber || tableId}</strong>.</>
                        ) : (
                            "Informe o número da mesa para iniciar."
                        )}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Waiter Selection (Mocked for now) */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="waiter" className="text-right text-xs uppercase font-bold text-muted-foreground">
                            Garçom
                        </Label>
                        <div className="col-span-3">
                            <Select value={waiterId} onValueChange={setWaiterId} disabled>
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="current-user-id">Eu (Logado)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {!tableId && !tableNumber && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tableNum" className="text-right text-xs uppercase font-bold text-muted-foreground">
                                Mesa
                            </Label>
                            <div className="col-span-3 relative">
                                <Input
                                    id="tableNum"
                                    type="number"
                                    value={customTableNumber}
                                    onChange={(e) => setCustomTableNumber(e.target.value)}
                                    placeholder="Nº da Mesa"
                                    className="h-10 font-bold"
                                    autoFocus
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer" className="text-right text-xs uppercase font-bold text-muted-foreground">
                            Cliente
                        </Label>
                        <div className="col-span-3 relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="customer"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Nome do cliente (Opcional)"
                                className="pl-9 h-10"
                                autoFocus={!!(tableId || tableNumber)}
                                onKeyDown={(e) => e.key === 'Enter' && handleOpenOrder()}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="people" className="text-right text-xs uppercase font-bold text-muted-foreground">
                            Pessoas
                        </Label>
                        <div className="col-span-3 relative flex items-center gap-3">
                            <div className="relative w-24">
                                <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="people"
                                    type="number"
                                    min="1"
                                    value={peopleCount}
                                    onChange={(e) => setPeopleCount(e.target.value)}
                                    className="pl-9 h-10"
                                />
                            </div>
                            <span className="text-xs text-muted-foreground">Para cálculo de ticket médio.</span>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleOpenOrder} disabled={loading} className="btn-primary min-w-[120px]">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Abrir Mesa"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
