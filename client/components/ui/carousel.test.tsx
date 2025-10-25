import { render, screen } from '@testing-library/react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './carousel';

describe('Carousel', () => {
    it('renders carousel components without crashing', () => {
        render(
            <Carousel>
                <CarouselContent>
                    <CarouselItem>Item 1</CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        );
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        // Due to jsdom limitations, we can't test the button interactions,
        // but we can ensure they render.
        expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
    });

    it('can be oriented vertically', () => {
        const { container } = render(
            <Carousel orientation="vertical">
                <CarouselContent>
                    <CarouselItem>Item 1</CarouselItem>
                </CarouselContent>
            </Carousel>
        );
        // Check for the presence of the vertical orientation class on the content
        const content = container.querySelector('.flex-col');
        expect(content).toBeInTheDocument();
    });
});