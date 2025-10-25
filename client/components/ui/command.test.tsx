import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from './command';

describe('Command', () => {
    it('renders a command menu with items', () => {
        render(
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        expect(screen.getByPlaceholderText('Type a command or search...')).toBeInTheDocument();
        expect(screen.getByText('Suggestions')).toBeInTheDocument();
        expect(screen.getByText('Calendar')).toBeInTheDocument();
        expect(screen.getByText('Search Emoji')).toBeInTheDocument();
    });

    it('filters items based on input', async () => {
        const user = userEvent.setup();
        render(
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const input = screen.getByPlaceholderText('Type a command or search...');
        await user.type(input, 'Cal');

        expect(await screen.findByText('Calendar')).toBeVisible();
        expect(await screen.findByText('Calculator')).toBeVisible();
        expect(screen.queryByText('Search Emoji')).not.toBeInTheDocument();
    });

    it('shows an empty message when no items match', async () => {
        const user = userEvent.setup();
        render(
            <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const input = screen.getByPlaceholderText('Type a command or search...');
        await user.type(input, 'xyz');

        expect(await screen.findByText('No results found.')).toBeInTheDocument();
    });

    it('can have separators and shortcuts', () => {
        render(
            <Command>
                <CommandList>
                    <CommandGroup heading="Settings">
                        <CommandItem>Profile</CommandItem>
                        <CommandItem>Billing</CommandItem>
                        <CommandSeparator />
                        <CommandItem>
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        expect(screen.getByRole('separator')).toBeInTheDocument();
        expect(screen.getByText('⌘S')).toBeInTheDocument();
    });
});

describe('CommandDialog', () => {
    it('opens and closes the command dialog', async () => {
        const user = userEvent.setup();
        const TestComponent = () => {
            const [open, setOpen] = React.useState(false);
            return (
                <>
                    <button onClick={() => setOpen(true)}>Open Dialog</button>
                    <CommandDialog open={open} onOpenChange={setOpen}>
                        <CommandInput placeholder="Type a command or search..." />
                    </CommandDialog>
                </>
            );
        };
        render(<TestComponent />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        await user.click(screen.getByText('Open Dialog'));

        expect(screen.getByRole('dialog')).toBeInTheDocument();

        // Pressing Escape should close it
        await user.keyboard('{Escape}');
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});