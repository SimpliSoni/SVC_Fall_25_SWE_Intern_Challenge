import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Marketplace from './Marketplace';
import { AppProviders } from '../App';

vi.mock('@/lib/supabase');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ currency: 'USD' }),
  })
) as jest.Mock;

describe('Marketplace', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the marketplace with a list of companies', async () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <Marketplace />
        </MemoryRouter>
      </AppProviders>
    );

    expect(screen.getByText('Company Marketplace')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Silicon Valley Consulting')).toBeInTheDocument();
    });
  });

  it('navigates to the company page when an available company is clicked', async () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <Marketplace />
        </MemoryRouter>
      </AppProviders>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Silicon Valley Consulting'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/companies/silicon-valley-consulting');
  });

  it('shows an alert when a locked company is clicked', async () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <Marketplace />
        </MemoryRouter>
      </AppProviders>
    );

    await waitFor(() => {
      // Find a locked company. "Tech Innovations Corp" is the first one.
      fireEvent.click(screen.getByText('Tech Innovations Corp'));
    });

    expect(screen.getByText(/Company Locked/i)).toBeInTheDocument();
  });
});