import { render, screen } from '@testing-library/react';
import { Slider } from './slider';

describe('Slider', () => {
  it('renders a slider element', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('sets the correct value', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');
  });

  it('applies custom className', () => {
    const { container } = render(<Slider defaultValue={[50]} max={100} step={1} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});