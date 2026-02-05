import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Users, Clock, Receipt } from "lucide-react";

type TableStatus = 'FREE' | 'OCCUPIED' | 'BILL_REQUESTED' | 'DIRTY';

type TableCardProps = {
    id: string;
    number: number;
    status: TableStatus;
    elapsedTime?: string; // "01:30"
    totalAmount?: number;
    peopleCount?: number;
    onClick: () => void;
};

const statusConfig = {
    FREE: {
        color: "bg-emerald-500 hover:bg-emerald-600",
        label: "Livre",
        textColor: "text-white"
    },
    OCCUPIED: {
        color: "bg-red-500 hover:bg-red-600",
        label: "Ocupada",
        textColor: "text-white"
    },
    BILL_REQUESTED: {
        color: "bg-yellow-400 hover:bg-yellow-500",
        label: "Pagamento",
        textColor: "text-black"
    },
    DIRTY: {
        color: "bg-slate-500 hover:bg-slate-600",
        label: "Suja",
        textColor: "text-white"
    }
};

export function TableCard({ number, status, elapsedTime, totalAmount, peopleCount, onClick }: TableCardProps) {
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.FREE;

    return (
        <Card
            onClick={onClick}
            className={cn(
                "w-28 h-28 cursor-pointer transition-all shadow-md active:scale-95 flex flex-col justify-between p-2 relative overflow-hidden",
                config.color,
                config.textColor
            )}
        >
            <div className="flex justify-between items-start">
                <span className="text-2xl font-bold">{number}</span>
                {status !== 'FREE' && (
                    <div className="flex items-center text-xs opacity-90">
                        {elapsedTime && (
                            <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {elapsedTime}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1 mt-auto">
                {status === 'FREE' ? (
                    <span className="text-xs font-medium opacity-80 uppercase tracking-wider">Disponível</span>
                ) : (
                    <>
                        {totalAmount !== undefined && (
                            <div className="font-bold text-sm">
                                R$ {totalAmount.toFixed(2)}
                            </div>
                        )}
                        <div className="flex items-center justify-between text-xs opacity-80">
                            {peopleCount && (
                                <div className="flex items-center">
                                    <Users className="w-3 h-3 mr-1" />
                                    {peopleCount}
                                </div>
                            )}
                            <div className="flex items-center uppercase text-[10px]">
                                {config.label}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
}
