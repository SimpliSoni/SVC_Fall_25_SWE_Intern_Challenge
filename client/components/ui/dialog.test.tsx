import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog';

describe('Dialog', () => {
  it('opens and closes the dialog', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();

    const closeButtons = screen.getAllByRole('button', { name: /Close/i });
    const visibleCloseButton = closeButtons.find(
      (button) => !button.querySelector('span.sr-only')
    );
    await user.click(visibleCloseButton);
    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
  });
});