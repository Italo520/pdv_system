"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRightLeft, UtensilsCrossed } from "lucide-react";
import { transferItems } from "@/actions/transfer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TransferItemsModalProps {
    isOpen: boolean;
    onClose: () => void;
    sourceOrderId: string;
    sourceTableNumber?: string | number;
    items: {
        id: string;
        product: { name: string };
        quantity: number;
        unitPrice: number;
    }[];
}

export function TransferItemsModal({ isOpen, onClose, sourceOrderId, sourceTableNumber, items }: TransferItemsModalProps) {
    const router = useRouter();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [targetTable, setTargetTable] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleTransfer = async () => {
        if (selectedItems.length === 0) return;
        if (!targetTable) {
            toast.error("Informe a mesa de destino.");
            return;
        }

        setLoading(true);
        try {
            const result: any = await transferItems({
                sourceOrderId,
                targetTableNumber: parseInt(targetTable),
                items: selectedItems.map(id => {
                    const item = items.find(i => i.id === id);
                    return { id, quantity: item?.quantity || 1 };
                })
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Itens transferidos com sucesso!");
                onClose();
                setSelectedItems([]);
                setTargetTable("");
                // Optional: Redirect to new table?
                // router.push(`/pdv/tables/${result.targetOrderId}`);
            }
        } catch (error) {
            toast.error("Erro ao transferir itens.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ArrowRightLeft className="w-5 h-5 text-primary" />
                        Transferir Itens
                    </DialogTitle>
                    <DialogDescription>
                        Selecione os itens da <strong>Mesa {sourceTableNumber}</strong> para mover.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    {/* Step 1: Select Items */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs uppercase font-bold text-muted-foreground">Itens Disponíveis</Label>
                            <span className="text-xs text-muted-foreground">{selectedItems.length} selecionados</span>
                        </div>
                        <ScrollArea className="h-[200px] border rounded-lg p-2 bg-muted/20">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                                    <UtensilsCrossed className="w-8 h-8 mb-2" />
                                    <p className="text-xs">Nenhum item neste pedido.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {items.map(item => (
                                        <div key={item.id} className="flex items-start space-x-3 p-2 rounded hover:bg-muted/50 transition-colors">
                                            <Checkbox
                                                id={item.id}
                                                checked={selectedItems.includes(item.id)}
                                                onCheckedChange={() => toggleItem(item.id)}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <Label
                                                    htmlFor={item.id}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    {item.quantity}x {item.product.name}
                                                </Label>
                                                <p className="text-xs text-muted-foreground">
                                                    R$ {Number(item.unitPrice).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </div>

                    {/* Step 2: Target Table */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="target" className="text-right text-xs uppercase font-bold text-muted-foreground">
                            Para Mesa
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="target"
                                type="number"
                                value={targetTable}
                                onChange={(e) => setTargetTable(e.target.value)}
                                placeholder="Nº da Mesa Destino"
                                className="font-bold"
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleTransfer} disabled={loading || selectedItems.length === 0 || !targetTable} className="btn-primary min-w-[120px]">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar Transferência"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
