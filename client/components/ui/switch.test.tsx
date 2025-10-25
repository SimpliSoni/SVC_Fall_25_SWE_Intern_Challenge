import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders a switch element', () => {
    render(<Switch data-testid="test-switch" />);
    expect(screen.getByTestId('test-switch')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Switch className="custom-class" data-testid="test-switch" />);
    expect(screen.getByTestId('test-switch')).toHaveClass('custom-class');
  });

  it('toggles the switch', async () => {
    const user = userEvent.setup();
    render(<Switch data-testid="test-switch" />);
    const switchEl = screen.getByTestId('test-switch');
    expect(switchEl).not.toBeChecked();
    await user.click(switchEl);
    expect(switchEl).toBeChecked();
  });
});