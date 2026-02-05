import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TransferButton } from "@/components/pdv/transfer-button";

interface OrderPageProps {
    params: Promise<{
        id: string;
    }>
}

export default async function OrderPage({ params }: OrderPageProps) {
    const { id } = await params;

    const orderRaw = await prisma.order.findUnique({
        where: { id },
        include: {
            table: true,
            waiter: true,
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!orderRaw) {
        return notFound();
    }

    // Serialize to remove Decimal types (Next.js cannot serialize Decimal objects to Client Components)
    const order = JSON.parse(JSON.stringify(orderRaw));

    return (
        <div className="min-h-screen bg-background p-4">
            <header className="flex items-center gap-4 mb-6">
                <Link href="/pdv/tables">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        Mesa {order.table?.number || order.tableId}
                        <Badge variant={order.status === 'OPEN' ? 'default' : 'secondary'}>
                            {order.status}
                        </Badge>
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Pedido #{order.id.slice(-6)} • {order.customerName || 'Cliente não identificado'}
                    </p>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <TransferButton
                            orderId={order.id}
                            tableNumber={order.table?.number.toString()}
                            items={order.items}
                        />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <Card className="p-4 min-h-[400px] flex items-center justify-center text-muted-foreground border-dashed">
                        {order.items.length === 0 ? (
                            <p>Nenhum item lançado ainda.</p>
                        ) : (
                            <ul>
                                {order.items.map((item: { id: string; quantity: number; product: { name: string } }) => (
                                    <li key={item.id}>{item.product.name} - {item.quantity}x</li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card className="p-4">
                        <h2 className="font-bold mb-2">Resumo</h2>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Subtotal</span>
                            <span>R$ {Number(order.totalAmount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4 border-t pt-2">
                            <span>Total</span>
                            <span>R$ {Number(order.totalAmount).toFixed(2)}</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
