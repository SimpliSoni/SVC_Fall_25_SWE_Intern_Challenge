import { render, screen } from '@testing-library/react';
import { Label } from './label';

describe('Label', () => {
  it('renders a label element', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Test Label</Label>);
    expect(screen.getByText('Test Label')).toHaveClass('custom-class');
  });
});