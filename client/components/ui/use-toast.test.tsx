import { renderHook, act, waitFor } from '@testing-library/react';
import { useToast } from './use-toast';
import { Toaster } from './toaster';
import React from 'react';

const ToasterWrapper = ({ children }) => (
    <>
        {children}
        <Toaster />
    </>
);

describe('useToast', () => {
    it('should add and remove a toast', async () => {
        const { result } = renderHook(() => useToast(), { wrapper: ToasterWrapper });

        let toast;
        act(() => {
            toast = result.current.toast({ title: 'Hello' });
        });

        await waitFor(() => {
            expect(result.current.toasts).toHaveLength(1);
        });
        expect(result.current.toasts[0].title).toBe('Hello');

        act(() => {
            toast.dismiss();
        });

        await waitFor(() => {
            expect(result.current.toasts).toHaveLength(0);
        });
    });

    it('should add a toast with a description', async () => {
        const { result } = renderHook(() => useToast(), { wrapper: ToasterWrapper });

        act(() => {
            result.current.toast({ title: 'Hello', description: 'World' });
        });

        expect(result.current.toasts[0].description).toBe('World');
    });

    it('should add a destructive toast', () => {
        const { result } = renderHook(() => useToast(), { wrapper: ToasterWrapper });

        act(() => {
            result.current.toast({ title: 'Error', variant: 'destructive' });
        });

        expect(result.current.toasts[0].variant).toBe('destructive');
    });

    it('should automatically dismiss a toast after a timeout', async () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useToast(), { wrapper: ToasterWrapper });

        act(() => {
            result.current.toast({ title: 'Auto-dismiss' });
        });

        await waitFor(() => {
            expect(result.current.toasts).toHaveLength(1);
        });

        act(() => {
            vi.runAllTimers();
        });

        await waitFor(() => {
            expect(result.current.toasts).toHaveLength(0);
        });
        vi.useRealTimers();
    });
});