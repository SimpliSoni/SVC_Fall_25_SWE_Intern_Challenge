import { render, screen } from '@testing-library/react';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders a div element', () => {
    render(<Skeleton data-testid="test-skeleton" />);
    expect(screen.getByTestId('test-skeleton')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-class" data-testid="test-skeleton" />);
    expect(screen.getByTestId('test-skeleton')).toHaveClass('custom-class');
  });
});