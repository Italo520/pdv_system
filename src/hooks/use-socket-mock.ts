import { useEffect, useState } from 'react';

type TableStatus = 'available' | 'occupied' | 'reserved' | 'attention';

interface TableUpdate {
    id: string;
    status: TableStatus;
}

export function useSocketMock(initialData: any[]) {
    const [tables, setTables] = useState(initialData);

    useEffect(() => {
        // Initial sync
        setTables(initialData);
    }, [initialData]);

    // Random auto-updates removed as per request.
    // In a real implementation, this would be listening to `socket.on('table:update')`

    return tables;
}
