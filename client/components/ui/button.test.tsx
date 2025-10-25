import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders a button element by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /Click me/i })).toBeInTheDocument();
  });

  it('applies the correct classes for the default variant and size', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary text-primary-foreground');
  });

  it('applies the correct classes for a specified variant and size', () => {
    render(<Button variant="destructive" size="sm">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive text-destructive-foreground');
    expect(button).toHaveClass('h-9 rounded-md px-3');
  });

  it('renders as a child component when asChild is true', () => {
    render(<Button asChild><a href="/">Click me</a></Button>);
    expect(screen.getByRole('link', { name: /Click me/i })).toBeInTheDocument();
  });
});