import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserMenu } from './UserMenu';
import { useAuth } from '@/hooks/useAuth';
import { AppProviders } from '../App';

vi.mock('@/hooks/useAuth', async () => {
    const actual = await vi.importActual('@/hooks/useAuth');
    return {
        ...actual,
        useAuth: vi.fn(),
    };
});

vi.mock('./MagicLinkAuth', () => ({
    MagicLinkAuth: () => <div>MagicLinkAuth</div>
}));
vi.mock('@/lib/supabase');

const mockSignOut = vi.fn();

describe('UserMenu', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows a loading spinner when auth state is loading', () => {
        (useAuth as jest.Mock).mockReturnValue({ loading: true, user: null, signOut: mockSignOut });
        render(
            <AppProviders>
                <UserMenu />
            </AppProviders>
        );
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('shows "Sign In" button when user is not authenticated', () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false, signOut: mockSignOut });
        render(
            <AppProviders>
                <UserMenu />
            </AppProviders>
        );
        expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });

    it('shows user email and sign out button when user is authenticated', async () => {
        const user = { email: 'test@example.com' };
        (useAuth as jest.Mock).mockReturnValue({ user, loading: false, signOut: mockSignOut });
        const userEvt = userEvent.setup();
        render(
            <AppProviders>
                <UserMenu />
            </AppProviders>
        );

        await userEvt.click(screen.getByRole('button', { name: /test/i }));

        expect(await screen.findByText(user.email)).toBeInTheDocument();
        expect(await screen.findByText(/Sign out/i)).toBeInTheDocument();
    });

    it('calls signOut when the sign out button is clicked', async () => {
        const user = { email: 'test@example.com' };
        (useAuth as jest.Mock).mockReturnValue({ user, loading: false, signOut: mockSignOut });
        const userEvt = userEvent.setup();
        render(
            <AppProviders>
                <UserMenu />
            </AppProviders>
        );

        await userEvt.click(screen.getByRole('button', { name: /test/i }));

        const signOutButton = await screen.findByText(/Sign out/i);
        await userEvt.click(signOutButton);

        await waitFor(() => {
            expect(mockSignOut).toHaveBeenCalled();
        });
    });
});