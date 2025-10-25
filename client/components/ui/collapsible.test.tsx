import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from './collapsible';

describe('Collapsible', () => {
    it('opens and closes the collapsible content', async () => {
        const user = userEvent.setup();
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>
                    <div>Content</div>
                </CollapsibleContent>
            </Collapsible>
        );

        const trigger = screen.getByText('Toggle');

        // Content should be hidden initially
        expect(screen.queryByText('Content')).not.toBeInTheDocument();

        // Click to open
        await user.click(trigger);
        const content = await screen.findByText('Content');
        expect(content).toBeVisible();

        // Click to close
        await user.click(trigger);
        await waitFor(() => {
            expect(screen.queryByText('Content')).not.toBeInTheDocument();
        });
    });

    it('can be open by default', () => {
        render(
            <Collapsible defaultOpen>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>
                    <div>Content</div>
                </CollapsibleContent>
            </Collapsible>
        );

        expect(screen.getByText('Content')).toBeVisible();
    });
});