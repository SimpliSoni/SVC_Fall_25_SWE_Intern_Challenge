import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

describe('useIsMobile', () => {
  const matchMediaMock = (matches: boolean) => ({
    matches,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });

  it('should return false for desktop size', () => {
    window.matchMedia = vi.fn().mockImplementation(() => matchMediaMock(false));
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true for mobile size', () => {
    window.matchMedia = vi.fn().mockImplementation(() => matchMediaMock(true));
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should update on resize', () => {
    let mediaQueryCallback: () => void;
    const matchMediaMockWithCallback = (matches: boolean) => ({
      matches,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event, callback) => {
        if (event === 'change') {
          mediaQueryCallback = callback;
        }
      }),
      removeEventListener: vi.fn(),
    });

    window.matchMedia = vi.fn().mockImplementation(() => matchMediaMockWithCallback(false));
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
      if (mediaQueryCallback) {
        mediaQueryCallback();
      }
    });

    expect(result.current).toBe(true);
  });
});