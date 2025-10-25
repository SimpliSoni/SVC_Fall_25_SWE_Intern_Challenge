import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from './menubar';

describe('Menubar', () => {
    const TestMenubar = () => (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Email link</MenubarItem>
                            <MenubarItem>Messages</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarRadioGroup value="benoit">
                        <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                        <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                    </MenubarRadioGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );

    it('opens and closes a menu', async () => {
        const user = userEvent.setup();
        render(<TestMenubar />);

        const trigger = screen.getByText('File');
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();

        await user.click(trigger);
        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();
        expect(screen.getByText('New Tab')).toBeInTheDocument();

        // Clicking the trigger again should close it
        await user.click(trigger);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('opens and closes sub-menus', async () => {
        const user = userEvent.setup();
        render(<TestMenubar />);
        await user.click(screen.getByText('File'));

        const subTrigger = screen.getByText('Share');
        await user.click(subTrigger);

        const subMenu = await screen.findByRole('menu');
        expect(subMenu).toBeInTheDocument();
        expect(screen.getByText('Email link')).toBeInTheDocument();
    });

    it('toggles checkbox items', async () => {
        const user = userEvent.setup();
        const StatefulMenubar = () => {
            const [checked, setChecked] = React.useState(true);
            return (
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                            <MenubarCheckboxItem checked={checked} onCheckedChange={setChecked}>
                                Always Show Full URLs
                            </MenubarCheckboxItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            );
        };
        render(<StatefulMenubar />);
        await user.click(screen.getByText('File'));

        const checkbox = screen.getByRole('menuitemcheckbox');
        expect(checkbox).toHaveAttribute('aria-checked', 'true');

        await user.click(checkbox);
        expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('selects radio items', async () => {
        const user = userEvent.setup();
        const StatefulRadioMenubar = () => {
            const [value, setValue] = React.useState('benoit');
            return (
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                            <MenubarRadioGroup value={value} onValueChange={setValue}>
                                <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                                <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                            </MenubarRadioGroup>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            );
        };
        render(<StatefulRadioMenubar />);
        await user.click(screen.getByText('File'));

        const andyItem = screen.getByText('Andy').closest('div[role="menuitemradio"]');
        const benoitItem = screen.getByText('Benoit').closest('div[role="menuitemradio"]');

        expect(andyItem).toHaveAttribute('aria-checked', 'false');
        expect(benoitItem).toHaveAttribute('aria-checked', 'true');

        await user.click(andyItem);

        expect(andyItem).toHaveAttribute('aria-checked', 'true');
        expect(benoitItem).toHaveAttribute('aria-checked', 'false');
    });
});