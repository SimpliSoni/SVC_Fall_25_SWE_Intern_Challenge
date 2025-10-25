import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from './toggle';

describe('Toggle', () => {
  it('renders a toggle button', () => {
    render(<Toggle>Toggle</Toggle>);
    expect(screen.getByRole('button', { name: /Toggle/i })).toBeInTheDocument();
  });

  it('applies the correct classes for the default variant and size', () => {
    render(<Toggle>Toggle</Toggle>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('applies the correct classes for a specified variant and size', () => {
    render(<Toggle variant="outline" size="sm">Toggle</Toggle>);
    const toggle = screen.getByRole('button');
    expect(toggle).toHaveClass('border-input');
    expect(toggle).toHaveClass('h-9');
  });

  it('toggles the toggle', async () => {
    const user = userEvent.setup();
    render(<Toggle>Toggle</Toggle>);
    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAttribute('data-state', 'off');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('data-state', 'on');
  });
});