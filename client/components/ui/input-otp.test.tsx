import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from './input-otp';

describe('InputOTP', () => {
    it('renders the correct number of input slots', () => {
        render(
            <InputOTP maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        );

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('maxLength', '6');
        expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('allows typing into the slots and calls onComplete', async () => {
        const user = userEvent.setup();
        const onComplete = vi.fn();
        render(
            <InputOTP maxLength={3} onComplete={onComplete}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
            </InputOTP>
        );

        const input = screen.getByRole('textbox');
        await user.type(input, '123');

        expect(onComplete).toHaveBeenCalledWith('123');
    });

    it('handles pasting a value', async () => {
        const user = userEvent.setup();
        const onComplete = vi.fn();
        render(
            <InputOTP maxLength={3} onComplete={onComplete}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
            </InputOTP>
        );

        const input = screen.getByRole('textbox');
        input.focus();
        await user.paste('123');

        expect(onComplete).toHaveBeenCalledWith('123');
    });

    it('is disabled when the disabled prop is true', () => {
        render(
            <InputOTP maxLength={1} disabled>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                </InputOTPGroup>
            </InputOTP>
        );

        expect(screen.getByRole('textbox')).toBeDisabled();
    });
});