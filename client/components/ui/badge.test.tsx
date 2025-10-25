import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders a badge with children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies the default variant class', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toHaveClass('bg-primary');
  });

  it('applies the destructive variant class', () => {
    render(<Badge variant="destructive">New</Badge>);
    expect(screen.getByText('New')).toHaveClass('bg-destructive');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">New</Badge>);
    expect(screen.getByText('New')).toHaveClass('custom-class');
  });
});