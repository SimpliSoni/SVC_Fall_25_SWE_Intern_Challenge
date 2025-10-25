import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from './select';

describe('Select', () => {
  it('opens and closes the select menu', async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    await user.click(screen.getByRole('combobox'));
    expect(await screen.findByText('Apple')).toBeInTheDocument();
  });

  it('selects an item', async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    await user.click(screen.getByRole('combobox'));
    const appleOption = await screen.findByText('Apple');
    await user.click(appleOption);

    expect(screen.getByText('Apple')).toBeInTheDocument();
  });
});