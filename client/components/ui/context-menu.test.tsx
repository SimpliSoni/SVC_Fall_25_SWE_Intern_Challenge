import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from './context-menu';

describe('ContextMenu', () => {
    const TestContextMenu = () => (
        <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                Right-click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem>
                    Back
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem disabled>
                    Forward
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                    Reload
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                        <ContextMenuItem>
                            Save Page As...
                            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked>
                    Show Bookmarks Bar
                    <ContextMenuShortcut>⇧⌘B</ContextMenuShortcut>
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuRadioGroup value="pedro">
                    <ContextMenuLabel>People</ContextMenuLabel>
                    <ContextMenuRadioItem value="pedro">
                        Pedro Duarte
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                </ContextMenuRadioGroup>
            </ContextMenuContent>
        </ContextMenu>
    );

    it('opens the context menu on right-click', async () => {
        const user = userEvent.setup();
        render(<TestContextMenu />);

        const trigger = screen.getByText('Right-click here');
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();

        await user.pointer({ keys: '[MouseRight]', target: trigger });

        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('handles disabled items', async () => {
        const user = userEvent.setup();
        render(<TestContextMenu />);
        await user.pointer({ keys: '[MouseRight]', target: screen.getByText('Right-click here') });

        const disabledItem = screen.getByText('Forward').closest('div[role="menuitem"]');
        expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
    });

    it('opens and closes sub-menus', async () => {
        const user = userEvent.setup();
        render(<TestContextMenu />);
        fireEvent.contextMenu(screen.getByText('Right-click here'));

        const subTrigger = screen.getByText('More Tools');
        await user.click(subTrigger);

        const subMenu = await screen.findByRole('menu');
        expect(subMenu).toBeInTheDocument();
        expect(screen.getByText('Save Page As...')).toBeInTheDocument();
    });

    it('toggles checkbox items', async () => {
        const user = userEvent.setup();
        const StatefulContextMenu = () => {
            const [showBookmarks, setShowBookmarks] = React.useState(true);
            return (
                <ContextMenu>
                    <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                            Show Bookmarks Bar
                        </ContextMenuCheckboxItem>
                    </ContextMenuContent>
                </ContextMenu>
            );
        };
        render(<StatefulContextMenu />);
        fireEvent.contextMenu(screen.getByText('Right-click here'));

        const checkbox = screen.getByText('Show Bookmarks Bar');
        expect(checkbox).toHaveAttribute('data-state', 'checked');

        await user.click(checkbox);
        expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });

    it('selects radio items', async () => {
        const user = userEvent.setup();
        const StatefulRadioContextMenu = () => {
            const [person, setPerson] = React.useState('pedro');
            return (
                <ContextMenu>
                    <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
                            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                        </ContextMenuRadioGroup>
                    </ContextMenuContent>
                </ContextMenu>
            );
        };
        render(<StatefulRadioContextMenu />);
        fireEvent.contextMenu(screen.getByText('Right-click here'));

        const pedroItem = screen.getByText('Pedro Duarte');
        const colmItem = screen.getByText('Colm Tuite');

        expect(pedroItem).toHaveAttribute('data-state', 'checked');
        expect(colmItem).toHaveAttribute('data-state', 'unchecked');

        await user.click(colmItem);

        expect(pedroItem).toHaveAttribute('data-state', 'unchecked');
        expect(colmItem).toHaveAttribute('data-state', 'checked');
    });
});