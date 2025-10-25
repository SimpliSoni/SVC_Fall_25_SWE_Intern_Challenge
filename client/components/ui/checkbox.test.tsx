import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
    it('renders a checkbox', () => {
        render(<Checkbox />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('can be checked and unchecked', async () => {
        const user = userEvent.setup();
        render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).not.toBeChecked();
        await user.click(checkbox);
        expect(checkbox).toBeChecked();
        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('is disabled when the disabled prop is true', () => {
        render(<Checkbox disabled />);
        expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('applies custom className', () => {
        const { container } = render(<Checkbox className="custom-class" />);
        // The checkbox is a button element
        expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
    });
});