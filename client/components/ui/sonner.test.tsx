import { render, screen, waitFor } from '@testing-library/react';
import { Toaster } from './sonner';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

describe('Toaster', () => {
  it('renders with the light theme by default', async () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
    render(<Toaster />);
    toast('Test Toast');
    await waitFor(() => {
      const sonner = document.querySelector('ol');
      expect(sonner).toHaveAttribute('data-theme', 'light');
    });
  });

  it('renders with the dark theme when specified', async () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });
    render(<Toaster />);
    toast('Test Toast');
    await waitFor(() => {
      const sonner = document.querySelector('ol');
      expect(sonner).toHaveAttribute('data-theme', 'dark');
    });
  });
});