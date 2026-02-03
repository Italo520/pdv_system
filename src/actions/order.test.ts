import { describe, it, expect, vi, beforeEach } from 'vitest';
import { openOrder } from './order';

// Use vi.hoisted to return a container object
const mocks = vi.hoisted(() => {
    return {
        mockTable: {
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            update: vi.fn(),
            create: vi.fn(),
        },
        mockOrder: {
            create: vi.fn(),
            findMany: vi.fn(),
        },
        mockRestaurant: {
            findFirst: vi.fn(),
            create: vi.fn()
        },
        mockUser: {
            findFirst: vi.fn(),
            create: vi.fn(),
            findUnique: vi.fn(),
        }
    };
});

// Mock prisma using the hoisted variables via the container
vi.mock('@/lib/prisma', () => {
    const mockPrisma = {
        $transaction: vi.fn((callback) => callback({
            table: mocks.mockTable,
            order: mocks.mockOrder,
            restaurant: mocks.mockRestaurant,
            user: mocks.mockUser
        })),
        table: mocks.mockTable,
        order: mocks.mockOrder,
        restaurant: mocks.mockRestaurant,
        user: mocks.mockUser
    };
    return { default: mockPrisma };
});

// Mock next/cache
vi.mock('next/cache', () => ({
    revalidatePath: vi.fn(),
}));

describe('openOrder Server Action', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should successfully open a new order for a free table (by ID)', async () => {
        // Arrange
        const tableId = 'table-free';
        const waiterId = 'user-1';

        // Set implementation via the container
        mocks.mockTable.findUnique.mockResolvedValue({
            id: tableId,
            status: 'FREE'
        });

        // Mock order creation
        const mockOrderResult = {
            id: 'order-1',
            status: 'OPEN',
            tableId,
            waiterId
        };
        mocks.mockOrder.create.mockResolvedValue(mockOrderResult);

        // Act
        const result = await openOrder({ tableId, waiterId });

        // Assert
        expect(mocks.mockTable.findUnique).toHaveBeenCalledWith({ where: { id: tableId } });
        expect(mocks.mockOrder.create).toHaveBeenCalled();
        expect(mocks.mockTable.update).toHaveBeenCalledWith({
            where: { id: tableId },
            data: { status: 'OCCUPIED' }
        });
        expect(result).toEqual(mockOrderResult);
    });

    it('should find existing table by number and open order', async () => {
        // Arrange
        const tableNumber = 15;
        const waiterId = 'user-1';
        const existingTable = { id: 'table-15', number: tableNumber, status: 'FREE' };

        mocks.mockTable.findFirst.mockResolvedValue(existingTable);

        const mockOrderResult = { id: 'order-15', status: 'OPEN', tableId: existingTable.id };
        mocks.mockOrder.create.mockResolvedValue(mockOrderResult);

        // Act
        const result = await openOrder({ tableNumber, waiterId });

        // Assert
        expect(mocks.mockTable.findFirst).toHaveBeenCalledWith({ where: { number: tableNumber } });
        expect(mocks.mockTable.update).toHaveBeenCalled();
        expect(result).toEqual(mockOrderResult);
    });

    it('should create new table and restaurant if not found (Auto-Seed)', async () => {
        // Arrange
        const tableNumber = 99;
        const waiterId = 'user-1';

        mocks.mockTable.findFirst.mockResolvedValue(null);
        mocks.mockRestaurant.findFirst.mockResolvedValue(null);
        mocks.mockRestaurant.create.mockResolvedValue({ id: 'rest-new' });

        const newTable = { id: 'table-99', number: tableNumber, status: 'FREE' };
        mocks.mockTable.create.mockResolvedValue(newTable);

        const mockOrderResult = { id: 'order-99', status: 'OPEN', tableId: newTable.id };
        mocks.mockOrder.create.mockResolvedValue(mockOrderResult);

        // Act
        const result = await openOrder({ tableNumber, waiterId });

        // Assert
        expect(mocks.mockRestaurant.create).toHaveBeenCalled();
        expect(mocks.mockTable.create).toHaveBeenCalled();
        expect(mocks.mockOrder.create).toHaveBeenCalled();
        expect(result).toEqual(mockOrderResult);
    });

    it('should auto-create waiter user if "current-user-id" is passed', async () => {
        const tableId = 't1';
        const waiterId = 'current-user-id';

        mocks.mockTable.findUnique.mockResolvedValue({ id: tableId, status: 'OCCUPIED' });
        mocks.mockUser.findFirst.mockResolvedValue(null);
        mocks.mockRestaurant.findFirst.mockResolvedValue({ id: 'r1' });
        mocks.mockUser.create.mockResolvedValue({ id: 'u-new', name: 'Garçom Padrão' });

        mocks.mockOrder.create.mockResolvedValue({ id: 'o1', waiterId: 'u-new' });

        const result = await openOrder({ tableId, waiterId });

        expect(mocks.mockUser.create).toHaveBeenCalled();
        expect(mocks.mockOrder.create).toHaveBeenCalledWith(expect.objectContaining({
            data: expect.objectContaining({ waiterId: 'u-new' })
        }));
    });
});
