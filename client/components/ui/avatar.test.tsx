import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';

describe('Avatar', () => {
    it('renders the fallback when the image fails to load', () => {
        render(
            <Avatar>
                <AvatarImage src="/non-existent-image.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        );

        // In jsdom, images don't load, so the fallback should be visible.
        const fallback = screen.getByText('CN');
        expect(fallback).toBeInTheDocument();
    });

    it('applies custom classNames', () => {
        const { container } = render(
            <Avatar className="custom-avatar">
                <AvatarImage className="custom-image" src="test.png" />
                <AvatarFallback className="custom-fallback">FB</AvatarFallback>
            </Avatar>
        );

        // The root element of the Avatar should have the custom class.
        expect(container.firstChild).toHaveClass('custom-avatar');
        // The fallback should have its custom class.
        expect(screen.getByText('FB')).toHaveClass('custom-fallback');
    });

});