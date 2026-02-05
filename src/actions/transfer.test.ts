import { describe, it, expect, vi, beforeEach } from 'vitest';
import { transferItems } from './transfer';
import prisma from '@/lib/prisma';

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
    default: {
        $transaction: vi.fn((callback) => callback(prisma)),
        order: {
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            create: vi.fn(),
        },
        table: {
            findFirst: vi.fn(),
            update: vi.fn(),
        },
        orderItem: {
            update: vi.fn(),
        },
        transferLog: {
            create: vi.fn(),
        }
    }
}));

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn(),
}));

describe('transferItems Server Action', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fail if no items are provided', async () => {
        const result = await transferItems({
            sourceOrderId: 'order-1',
            items: []
        });
        expect(result).toHaveProperty('error');
    });

    it('should fail if source order is not found', async () => {
        (prisma.order.findUnique as any).mockResolvedValue(null);

        const result = await transferItems({
            sourceOrderId: 'invalid-id',
            targetTableNumber: 10,
            items: [{ id: 'item-1', quantity: 1 }]
        });

        expect(result).toHaveProperty('error', 'Pedido de origem não encontrado.');
    });

    it('should transfer items to an existing target order', async () => {
        // Mock source order
        (prisma.order.findUnique as any).mockResolvedValueOnce({
            id: 'source-1',
            status: 'OPEN',
            restaurantId: 'rest-1',
            items: [{ id: 'item-1', name: 'Cerveja' }]
        });

        // Mock finding target order via findUnique
        (prisma.order.findUnique as any).mockResolvedValueOnce({
            id: 'target-1',
            status: 'OPEN'
        });

        const result = await transferItems({
            sourceOrderId: 'source-1',
            targetOrderId: 'target-1',
            items: [{ id: 'item-1', quantity: 1 }]
        });

        expect(prisma.orderItem.update).toHaveBeenCalledWith({
            where: { id: 'item-1' },
            data: { orderId: 'target-1' }
        });

        expect(prisma.transferLog.create).toHaveBeenCalled();
        expect(result).toHaveProperty('success', true);
    });

    it('should create a new order if target table is free', async () => {
        // Mock source
        (prisma.order.findUnique as any).mockResolvedValueOnce({
            id: 'source-1',
            status: 'OPEN',
            restaurantId: 'rest-1',
            items: [{ id: 'item-1' }]
        });

        // Mock table find (exists)
        (prisma.table.findFirst as any).mockResolvedValue({ id: 'table-99', number: 99 });

        // Mock existing order find (none)
        (prisma.order.findFirst as any).mockResolvedValue(null);

        // Mock create order
        (prisma.order.create as any).mockResolvedValue({ id: 'new-target-order', restaurantId: 'rest-1' });

        const result = await transferItems({
            sourceOrderId: 'source-1',
            targetTableNumber: 99,
            items: [{ id: 'item-1', quantity: 1 }]
        });

        expect(prisma.order.create).toHaveBeenCalled();
        expect(prisma.table.update).toHaveBeenCalledWith({
            where: { id: 'table-99' },
            data: { status: 'OCCUPIED' }
        });
        expect(result).toHaveProperty('success', true);
    });
});
