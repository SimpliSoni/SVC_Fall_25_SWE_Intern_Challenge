import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup, RadioGroupItem } from './radio-group';

describe('RadioGroup', () => {
  it('renders a radio group with items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio').length).toBe(2);
  });

  it('selects an item on click', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );

    const itemA = screen.getAllByRole('radio')[0];
    const itemB = screen.getAllByRole('radio')[1];

    expect(itemA).not.toBeChecked();
    expect(itemB).not.toBeChecked();

    await user.click(itemA);

    expect(itemA).toBeChecked();
    expect(itemB).not.toBeChecked();
  });

  it('applies custom className', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" className="custom-class" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio')).toHaveClass('custom-class');
  });
});