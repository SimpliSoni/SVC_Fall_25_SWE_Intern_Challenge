import { render, screen } from '@testing-library/react';
import { Progress } from './progress';

describe('Progress', () => {
  it('renders a progress bar', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets the correct value', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('applies custom className', () => {
    render(<Progress value={50} className="custom-class" />);
    expect(screen.getByRole('progressbar')).toHaveClass('custom-class');
  });
});