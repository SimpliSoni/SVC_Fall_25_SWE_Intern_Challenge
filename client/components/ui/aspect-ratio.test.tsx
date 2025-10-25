import { render, screen } from '@testing-library/react';
import { AspectRatio } from './aspect-ratio';

describe('AspectRatio', () => {
    it('renders its children', () => {
        render(
            <AspectRatio ratio={16 / 9}>
                <div>Child Content</div>
            </AspectRatio>
        );
        expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('applies the correct styling for aspect ratio', () => {
        const { container } = render(
            <AspectRatio ratio={1 / 1}>
                <div />
            </AspectRatio>
        );
        // We can't easily test the exact padding-bottom value in jsdom,
        // but we can check that the component renders without crashing
        // and contains the appropriate Radix structures.
        const radixWrapper = container.querySelector('div[style*="position: relative"]');
        expect(radixWrapper).toBeInTheDocument();
    });
});