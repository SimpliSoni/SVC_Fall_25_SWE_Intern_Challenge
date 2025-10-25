import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from './popover';

describe('Popover', () => {
  it('opens and closes the popover', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Popover Content')).toBeInTheDocument();

    await user.click(document.body);
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });
});