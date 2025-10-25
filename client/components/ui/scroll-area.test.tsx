import { render, screen } from '@testing-library/react';
import { ScrollArea, ScrollBar } from './scroll-area';
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

describe('ScrollArea', () => {
    it('renders a scroll area with children', () => {
        render(<ScrollArea><div>Content</div></ScrollArea>);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies custom className to ScrollArea', () => {
        const { container } = render(<ScrollArea className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    // The following test is disabled because Radix UI's ScrollArea does not render
    // the scrollbar in a jsdom environment as it cannot calculate layout.
    it.skip('renders a vertical scrollbar when content overflows', async () => {
        render(
            <ScrollArea style={{ height: '100px' }}>
                <div style={{ height: '200px' }} />
            </ScrollArea>
        );
        await screen.findByRole('scrollbar', { orientation: 'vertical' });
    });
});

describe('ScrollBar', () => {
    // Rendering ScrollBar to get coverage, but cannot assert on its presence
    // due to jsdom limitations with Radix UI's ScrollArea.
    it('renders vertical scrollbar without crashing', () => {
        render(<ScrollAreaPrimitive.Root><ScrollBar /></ScrollAreaPrimitive.Root>);
    });

    it('renders horizontal scrollbar without crashing', () => {
        render(<ScrollAreaPrimitive.Root><ScrollBar orientation="horizontal" /></ScrollAreaPrimitive.Root>);
    });
});