import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from './dropdown-menu';

describe('DropdownMenu', () => {
  it('opens and closes the dropdown menu', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('My Account')).toBeInTheDocument();
  });

  it('triggers onSelect when an item is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByText('Open'));
    await user.click(screen.getByText('Profile'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('toggles a checkbox item', async () => {
    const user = userEvent.setup();
    const CheckboxWrapper = () => {
      const [checked, setChecked] = React.useState(false);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
              Status
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };
    render(<CheckboxWrapper />);

    await user.click(screen.getByText('Open'));
    const checkbox = screen.getByRole('menuitemcheckbox');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('selects a radio item', async () => {
    const user = userEvent.setup();
    const RadioWrapper = () => {
      const [value, setValue] = React.useState('one');
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
              <DropdownMenuRadioItem value="one">One</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="two">Two</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };
    render(<RadioWrapper />);

    await user.click(screen.getByText('Open'));
    const radioOne = screen.getByRole('menuitemradio', { name: 'One' });
    const radioTwo = screen.getByRole('menuitemradio', { name: 'Two' });
    expect(radioOne).toBeChecked();
    expect(radioTwo).not.toBeChecked();
    await user.click(radioTwo);
    expect(radioOne).not.toBeChecked();
    expect(radioTwo).toBeChecked();
  });

  it('renders a shortcut', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            New Tab <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('⌘+T')).toBeInTheDocument();
  });
});