import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SocialQualifyForm from './SocialQualifyForm';
import { AppProviders } from '../App';

vi.mock('@/lib/supabase');

const mockSignInWithMagicLink = vi.fn(() => Promise.resolve({ error: null }));
vi.mock('@/hooks/useAuth', async () => {
    const actual = await vi.importActual('@/hooks/useAuth');
    return {
        ...actual,
        useAuth: () => ({
            ...actual.useAuth,
            signInWithMagicLink: mockSignInWithMagicLink,
        }),
    };
});

global.fetch = vi.fn();

describe('SocialQualifyForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ success: true, data: { matchedCompany: { name: 'Test Company', slug: 'test-company' } } }),
        });
    });

    it('renders the form correctly', () => {
        render(
            <AppProviders>
                <MemoryRouter>
                    <SocialQualifyForm />
                </MemoryRouter>
            </AppProviders>
        );

        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Reddit Username/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit Application/i })).toBeInTheDocument();
    });

    it('updates form data on input change', () => {
        render(
            <AppProviders>
                <MemoryRouter>
                    <SocialQualifyForm />
                </MemoryRouter>
            </AppProviders>
        );

        const emailInput = screen.getByLabelText(/Email Address/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput).toHaveValue('test@example.com');
    });

    it('submits the form successfully', async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ userExists: false }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ success: true, data: { matchedCompany: { name: 'Test Company', slug: 'test-company' } } }),
            });


        render(
            <AppProviders>
                <MemoryRouter>
                    <SocialQualifyForm />
                </MemoryRouter>
            </AppProviders>
        );

        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/Reddit Username/i), { target: { value: 'testuser' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit Application/i }));

        await waitFor(() => {
            expect(mockSignInWithMagicLink).toHaveBeenCalledWith('test@example.com');
        });

        await waitFor(() => {
            expect(screen.getByText(/Application Status Update/i)).toBeInTheDocument();
        });
    });

    it('shows an error if the user already exists', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ userExists: true }),
        });

        render(
            <AppProviders>
                <MemoryRouter>
                    <SocialQualifyForm />
                </MemoryRouter>
            </AppProviders>
        );

        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/Reddit Username/i), { target: { value: 'testuser' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit Application/i }));

        await waitFor(() => {
            expect(screen.getByText(/You have already signed up/i)).toBeInTheDocument();
        });
    });

    it('shows a validation error for invalid data', async () => {
        render(
            <AppProviders>
                <MemoryRouter>
                    <SocialQualifyForm />
                </MemoryRouter>
            </AppProviders>
        );

        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: /Submit Application/i }));

        await waitFor(() => {
            expect(screen.getByText(/email/i)).toBeInTheDocument();
        });
    });
});