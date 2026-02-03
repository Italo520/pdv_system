import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, FileText, Users } from "lucide-react";
import Link from "next/link";
import { AddOrderButton } from "./add-order-button"; // Separate client component for interactivity

interface TableDetailsPageProps {
    params: Promise<{
        id: string;
    }>
}

export default async function TableDetailsPage({ params }: TableDetailsPageProps) {
    const { id } = await params;

    const table = await prisma.table.findUnique({
        where: { id },
        include: {
            restaurant: true,
            orders: {
                where: {
                    status: {
                        in: ['OPEN', 'PREPARING', 'READY', 'DELIVERED']
                    }
                },
                orderBy: { createdAt: 'desc' },
                include: {
                    items: true
                }
            }
        }
    });

    if (!table) {
        return notFound();
    }

    // Calculate total table consumption
    const tableTotal = table.orders.reduce((acc, order) => acc + Number(order.totalAmount), 0);
    const peopleTotal = table.orders.reduce((acc, order) => acc + order.peopleCount, 0);

    return (
        <div className="min-h-screen bg-muted/40 p-4 md:p-8">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/pdv/tables">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            Mesa {table.number}
                            <Badge variant={table.status === 'FREE' ? 'outline' : 'default'} className="text-sm px-3 py-1">
                                {table.status === 'FREE' ? 'Livre' : 'Ocupada'}
                            </Badge>
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2 mt-1">
                            {table.restaurant?.name || 'Restaurante'} • <Users className="w-4 h-4" /> {peopleTotal} Pessoas
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total da Mesa</p>
                    <p className="text-3xl font-bold text-primary">R$ {tableTotal.toFixed(2)}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Add New Order Card */}
                <Card className="border-dashed border-2 flex flex-col items-center justify-center min-h-[200px] hover:bg-muted/50 transition-colors cursor-pointer group">
                    <AddOrderButton tableId={table.id} tableNumber={table.number} />
                </Card>

                {/* Existing Orders Cards */}
                {table.orders.map((order) => (
                    <Link key={order.id} href={`/pdv/${order.id}`} className="block">
                        <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-primary group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    #{order.id.slice(-4)}
                                </CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-1 truncate">
                                    {order.customerName || 'Cliente sem nome'}
                                </div>
                                <p className="text-xs text-muted-foreground mb-4">
                                    {order.peopleCount} {order.peopleCount === 1 ? 'pessoa' : 'pessoas'}
                                    • {order.items.length} itens
                                </p>
                                <div className="flex items-center justify-between border-t pt-3 mt-auto">
                                    <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                        {order.status}
                                    </span>
                                    <span className="font-bold">
                                        R$ {Number(order.totalAmount).toFixed(2)}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
