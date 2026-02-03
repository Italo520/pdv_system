"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getOrCreateTable } from "@/actions/table"
import { Loader2 } from "lucide-react"

interface OpenTableModalProps {
    isOpen: boolean
    onClose: () => void
}

export function OpenTableModal({ isOpen, onClose }: OpenTableModalProps) {
    const [tableNumber, setTableNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!tableNumber) return

        setIsLoading(true)
        try {
            const table = await getOrCreateTable(parseInt(tableNumber))
            onClose()
            router.push(`/pdv/tables/${table.id}`)
        } catch (error) {
            console.error(error)
            // Ideally show toast error here
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Abrir Mesa</DialogTitle>
                    <DialogDescription>
                        Informe o número da mesa para acessar ou criar.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Número
                            </Label>
                            <Input
                                id="number"
                                type="number"
                                value={tableNumber}
                                onChange={(e) => setTableNumber(e.target.value)}
                                className="col-span-3"
                                autoFocus
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading || !tableNumber}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Acessar Mesa
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
