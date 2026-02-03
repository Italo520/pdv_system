import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest';
import TablesPage from './page';
import { useSocketMock } from '@/hooks/use-socket-mock';

// Mock dependencies
vi.mock('@/hooks/use-socket-mock', () => ({
    useSocketMock: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, onClick }: any) => <div className={className} onClick={onClick}>{children}</div>,
    },
}));

// Mock UI components
vi.mock('@/components/pdv/sidebar', () => ({
    Sidebar: () => <div data-testid="sidebar">Sidebar Mock</div>,
}));

describe('TablesPage', () => {
    const initialTables = [
        { id: "01", status: "occupied", capacity: 4, orders: 3, total: 125.80, time: "45min" },
        { id: "02", status: "available", capacity: 2, orders: 0, total: 0, time: "-" },
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

    beforeEach(() => {
        (useSocketMock as unknown as { mockReturnValue: Function }).mockReturnValue(initialTables);
    });

    it('should render the page title', () => {
        render(<TablesPage />);
        expect(screen.getByText('Mapa de Mesas')).toBeInTheDocument();
    });

    it('should render tables with correct status', () => {
        render(<TablesPage />);
        const tableId = screen.getAllByText('01')[0];
        expect(tableId).toBeInTheDocument();

        const statusLabel = screen.getAllByText('Ocupada')[0];
        expect(statusLabel).toBeInTheDocument();
    });
});
