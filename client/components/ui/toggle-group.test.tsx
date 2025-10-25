import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

describe('ToggleGroup', () => {
  it('renders a toggle group with items', () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('toggles an item on click', async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    );

    const itemA = screen.getByText('A');
    const itemB = screen.getByText('B');

    expect(itemA).toHaveAttribute('data-state', 'off');
    expect(itemB).toHaveAttribute('data-state', 'off');

    await user.click(itemA);

    expect(itemA).toHaveAttribute('data-state', 'on');
    expect(itemB).toHaveAttribute('data-state', 'off');
  });

  it('applies the correct classes for a specified variant and size', () => {
    render(
      <ToggleGroup type="single" variant="outline" size="sm">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    const itemA = screen.getByText('A');
    expect(itemA).toHaveClass('border-input');
    expect(itemA).toHaveClass('h-9');
  });
});