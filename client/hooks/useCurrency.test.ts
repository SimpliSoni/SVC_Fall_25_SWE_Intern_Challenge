import { renderHook, waitFor } from '@testing-library/react';
import { useCurrency } from './useCurrency';

global.fetch = vi.fn();

describe('useCurrency', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should return USD as default currency and format correctly', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => useCurrency());

    await waitFor(() => expect(result.current.currencyLoading).toBe(false));

    expect(result.current.currency.code).toBe('USD');
    expect(result.current.formatCurrency(10)).toBe('$10.00');
  });

  it('should fetch and set a non-USD currency and format correctly', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ currency: 'EUR' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ rates: { EUR: 0.9 } }),
      });

    const { result } = renderHook(() => useCurrency());

    await waitFor(() => expect(result.current.currencyLoading).toBe(false));

    expect(result.current.currency.code).toBe('EUR');
    expect(result.current.currency.rate).toBe(0.9);
    expect(result.current.formatCurrency(10)).toBe('€9.00');
  });

  it('should fall back to USD if the ipapi.co API fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useCurrency());

    await waitFor(() => expect(result.current.currencyLoading).toBe(false));

    expect(result.current.currency.code).toBe('USD');
  });

  it('should fall back to USD if the exchangerate-api.com API fails', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ currency: 'EUR' }),
      })
      .mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useCurrency());

    await waitFor(() => expect(result.current.currencyLoading).toBe(false));

    expect(result.current.currency.code).toBe('USD');
  });
});