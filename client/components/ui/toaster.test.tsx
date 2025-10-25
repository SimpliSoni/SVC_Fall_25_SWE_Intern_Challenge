import { render, screen } from '@testing-library/react';
import { Toaster } from './toaster';
import { useToast } from '@/hooks/use-toast';

vi.mock('@/hooks/use-toast');

describe('Toaster', () => {
  it('renders a toast with a title and description', () => {
    (useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '1',
          title: 'Test Title',
          description: 'Test Description',
        },
      ],
    });

    render(<Toaster />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders a toast with an action', () => {
    (useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '1',
          title: 'Test Title',
          action: <button>Action</button>,
        },
      ],
    });

    render(<Toaster />);

    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});