import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from './hover-card';
import { CalendarIcon } from '@radix-ui/react-icons';

describe('HoverCard', () => {
    const TestHoverCard = () => (
        <HoverCard>
            <HoverCardTrigger>Hover me</HoverCardTrigger>
            <HoverCardContent>
                <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                            The React Framework – created and maintained by @vercel.
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                                Joined December 2021
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );

    it('shows and hides the hover card on hover', async () => {
        const user = userEvent.setup();
        render(<TestHoverCard />);

        const trigger = screen.getByText('Hover me');
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

        // Hover to show
        await user.hover(trigger);
        const tooltip = await screen.findByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
        expect(screen.getByText('@nextjs')).toBeInTheDocument();

        // Unhover to hide
        await user.unhover(trigger);
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
});