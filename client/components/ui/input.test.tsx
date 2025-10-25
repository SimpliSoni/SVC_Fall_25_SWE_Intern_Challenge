import { render, screen } from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input data-testid="test-input" />);
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('applies the correct type', () => {
    render(<Input type="password" data-testid="test-input" />);
    expect(screen.getByTestId('test-input')).toHaveAttribute('type', 'password');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="test-input" />);
    expect(screen.getByTestId('test-input')).toHaveClass('custom-class');
  });

  it('applies placeholder', () => {
    render(<Input placeholder="test placeholder" data-testid="test-input" />);
    expect(screen.getByTestId('test-input')).toHaveAttribute('placeholder', 'test placeholder');
  });
});