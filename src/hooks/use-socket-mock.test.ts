import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useSocketMock } from './use-socket-mock';

describe('useSocketMock', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should return initial data immediately', () => {
        const initialData = [{ id: '1', status: 'available' }];
        const { result } = renderHook(() => useSocketMock(initialData));

        expect(result.current).toEqual(initialData);
    });
});
