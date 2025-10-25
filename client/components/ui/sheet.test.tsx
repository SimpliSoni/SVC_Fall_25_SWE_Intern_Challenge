import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from './sheet';

describe('Sheet', () => {
  it('opens and closes the sheet', async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
          <div>Sheet Content</div>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();

    const closeButton = screen.getAllByRole('button', { name: /Close/i }).find(button => !button.closest('span.sr-only'));
    await user.click(closeButton);
    expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
  });

  it('applies the correct classes for the side variant', async () => {
    const user = userEvent.setup();
    render(
        <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent side="left" />
        </Sheet>
    );
    await user.click(screen.getByText('Open'));
    const sheetContent = await screen.findByTestId('sheet-content');
    expect(sheetContent).toHaveClass('data-[state=open]:slide-in-from-left');
  });
});