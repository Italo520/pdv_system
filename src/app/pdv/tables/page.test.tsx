import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { TablesMap } from './tables-map';

// Mock dependencies
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, onClick }: any) => <div className={className} onClick={onClick}>{children}</div>,
    },
}));

// Mock UI components
vi.mock('@/components/pdv/sidebar', () => ({
    Sidebar: () => <div data-testid="sidebar">Sidebar Mock</div>,
}));

vi.mock('@/components/pdv/closed-orders-history', () => ({
    ClosedOrdersHistory: () => <div data-testid="history">History Mock</div>,
}));

vi.mock('@/components/pdv/open-table-modal', () => ({
    OpenTableModal: () => <div data-testid="modal">Modal Mock</div>,
}));

describe('TablesMap', () => {
    const mockTables: any[] = [
        { id: "1", number: 1, status: "OCCUPIED", orders: [{ id: "o1", totalAmount: 100, items: [] }] },
        { id: "2", number: 2, status: "FREE" },
    ];

    beforeAll(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() { }
            unobserve() { }
            disconnect() { }
        };

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });

    it('should render the page title', () => {
        render(<TablesMap initialTables={mockTables} />);
        expect(screen.getByText('Mapa de Mesas')).toBeInTheDocument();
    });

    it('should render tables with correct status', () => {
        render(<TablesMap initialTables={mockTables} />);
        // Find table explicitly by text content if number is rendered
        // Based on TableCard implementations usually rendering number
        // Assuming TableCard renders number. If not, needs adjustment.
        // Checking for "Ocupada" label
        const statusLabel = screen.getAllByText('Ocupada')[0];
        expect(statusLabel).toBeInTheDocument();
    });
});
