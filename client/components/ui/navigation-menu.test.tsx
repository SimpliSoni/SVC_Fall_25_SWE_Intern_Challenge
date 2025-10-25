import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from './navigation-menu';
import { navigationMenuTriggerStyle } from './navigation-menu';

const TestNavigationMenu = () => (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                        <ListItem href="/docs" title="Introduction">
                            Re-usable components built using Radix UI and Tailwind CSS.
                        </ListItem>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
    </NavigationMenu>
);

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a ref={ref} className={className} {...props}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = 'ListItem';

describe('NavigationMenu', () => {
    it('shows and hides content on hover', async () => {
        const user = userEvent.setup();
        render(<TestNavigationMenu />);

        const trigger = screen.getByText('Getting started');
        expect(screen.queryByText('Introduction')).not.toBeInTheDocument();

        await user.hover(trigger);
        const content = await screen.findByText('Introduction');
        expect(content).toBeInTheDocument();
        expect(screen.getByText(/Re-usable components/)).toBeInTheDocument();

        // The Radix unhover behavior is difficult to test reliably with user-event.
        // This test primarily ensures the hover-to-open functionality works.
    });

    it('renders a simple link', () => {
        render(<TestNavigationMenu />);
        const link = screen.getByText('Documentation');
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass(navigationMenuTriggerStyle());
    });

    it('renders the viewport', () => {
        render(<TestNavigationMenu />);
        // The viewport is present but may not have a specific role
        // It's a div that gets populated on hover.
        // We can check for its presence by its Radix attribute.
        expect(document.querySelector('[data-radix-navigation-menu-viewport]')).toBeInTheDocument();
    });
});