import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './calendar';

describe('Calendar', () => {
    // We pass a fixed `month` to the component to ensure tests are deterministic.
    const initialMonth = new Date('2025-10-15');

    it('renders a calendar for a specific month', () => {
        render(<Calendar month={initialMonth} />);
        expect(screen.getByText('October 2025')).toBeInTheDocument();
    });

    it('can navigate to the next and previous months', async () => {
        render(<Calendar month={initialMonth} />);

        const nextButton = screen.getByLabelText('Go to the Next Month');
        const prevButton = screen.getByLabelText('Go to the Previous Month');

        fireEvent.click(nextButton);
        expect(await screen.findByText('November 2025')).toBeInTheDocument();

        fireEvent.click(prevButton); // back to Oct
        fireEvent.click(prevButton); // now to Sep
        expect(await screen.findByText('September 2025')).toBeInTheDocument();
    });

    it('selects a date when a day is clicked', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();
        render(<Calendar month={initialMonth} onSelect={onSelect} />);

        // The accessible name for a day button in react-day-picker is the full date.
        const dayButton = screen.getByRole('button', { name: /October 15/i });
        await user.click(dayButton);

        expect(onSelect).toHaveBeenCalledOnce();
        const selectedDate = onSelect.mock.calls[0][0];
        expect(selectedDate).toBeInstanceOf(Date);
        expect(selectedDate.getDate()).toBe(15);
    });

    it('is disabled when the disabled prop is true', () => {
        render(<Calendar month={initialMonth} disabled />);

        expect(screen.getByLabelText('Go to the Next Month')).toHaveAttribute('aria-disabled', 'true');
        expect(screen.getByLabelText('Go to the Previous Month')).toHaveAttribute('aria-disabled', 'true');

        const day = screen.getByText('15');
        expect(day.closest('button')).toBeNull();
    });
});