import { render, screen } from '@testing-library/react';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea data-testid="test-textarea" />);
    expect(screen.getByTestId('test-textarea')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" data-testid="test-textarea" />);
    expect(screen.getByTestId('test-textarea')).toHaveClass('custom-class');
  });

  it('applies placeholder', () => {
    render(<Textarea placeholder="test placeholder" data-testid="test-textarea" />);
    expect(screen.getByTestId('test-textarea')).toHaveAttribute('placeholder', 'test placeholder');
  });
});