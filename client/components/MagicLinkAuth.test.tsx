import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MagicLinkAuth } from './MagicLinkAuth';
import { useAuth } from '@/hooks/useAuth';
import { AppProviders } from '../App';

vi.mock('@/hooks/useAuth', async () => {
    const actual = await vi.importActual('@/hooks/useAuth');
    return {
        ...actual,
        useAuth: vi.fn(),
    };
});
vi.mock('@/lib/supabase');

const mockSignInWithMagicLink = vi.fn();

describe('MagicLinkAuth', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            signInWithMagicLink: mockSignInWithMagicLink,
        });
    });

    it('renders the sign-in form', () => {
        render(<MagicLinkAuth />);
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send Magic Link/i })).toBeInTheDocument();
    });

    it('updates the email field on user input', () => {
        render(<MagicLinkAuth />);
        const emailInput = screen.getByLabelText(/Email/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput).toHaveValue('test@example.com');
    });

    it('submits the form and shows success message', async () => {
        mockSignInWithMagicLink.mockResolvedValue({ error: null });
        const user = userEvent.setup();
        render(<MagicLinkAuth />);

        await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
        await user.click(screen.getByRole('button', { name: /Send Magic Link/i }));

        await waitFor(() => {
            expect(mockSignInWithMagicLink).toHaveBeenCalledWith('test@example.com');
        });

        expect(await screen.findByText(/Check Your Email/i)).toBeInTheDocument();
    });

    it('shows an error message if magic link sending fails', async () => {
        const errorMessage = 'Failed to send magic link';
        mockSignInWithMagicLink.mockResolvedValue({ error: { message: errorMessage } });
        const user = userEvent.setup();
        render(<MagicLinkAuth />);

        await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
        await user.click(screen.getByRole('button', { name: /Send Magic Link/i }));

        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });

    it('resets the form when "Send Another Link" is clicked', async () => {
        mockSignInWithMagicLink.mockResolvedValue({ error: null });
        const user = userEvent.setup();
        render(<MagicLinkAuth />);

        await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
        await user.click(screen.getByRole('button', { name: /Send Magic Link/i }));

        const sendAnotherButton = await screen.findByRole('button', { name: /Send Another Link/i });
        await user.click(sendAnotherButton);

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send Magic Link/i })).toBeInTheDocument();
    });

    it('calls onClose when the cancel button is clicked', async () => {
        const onClose = vi.fn();
        const user = userEvent.setup();
        render(<MagicLinkAuth onClose={onClose} />);

        await user.click(screen.getByRole('button', { name: /Cancel/i }));
        expect(onClose).toHaveBeenCalled();
    });
});