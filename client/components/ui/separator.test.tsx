import { render, screen } from '@testing-library/react';
import { Separator } from './separator';

describe('Separator', () => {
  it('renders a separator element', () => {
    render(<Separator data-testid="test-separator" />);
    expect(screen.getByTestId('test-separator')).toBeInTheDocument();
  });

  it('applies the correct classes for horizontal orientation', () => {
    render(<Separator orientation="horizontal" data-testid="test-separator" />);
    expect(screen.getByTestId('test-separator')).toHaveClass('h-[1px] w-full');
  });

  it('applies the correct classes for vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="test-separator" />);
    expect(screen.getByTestId('test-separator')).toHaveClass('h-full w-[1px]');
  });

  it('applies custom className', () => {
    render(<Separator className="custom-class" data-testid="test-separator" />);
    expect(screen.getByTestId('test-separator')).toHaveClass('custom-class');
  });
});