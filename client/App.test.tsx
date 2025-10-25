import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProviders, AppRoutes } from './App';

vi.mock('@/lib/supabase');

describe('AppProviders', () => {
  it('renders children without crashing', () => {
    render(
      <AppProviders>
        <div>Test Child</div>
      </AppProviders>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});

describe('AppRoutes', () => {
  it('renders the index page for the root path', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>
    );
    expect(screen.getByText(/Get Paid When AI Companies/i)).toBeInTheDocument();
  });

  it('renders the Silicon Valley Consulting page', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/companies/silicon-valley-consulting']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>
    );
    expect(
      screen.getByRole('heading', { name: /Silicon Valley Consulting/i })
    ).toBeInTheDocument();
  });

  it('renders the Not Found page for an unknown path', () => {
    render(
      <AppProviders>
        <MemoryRouter initialEntries={['/some/unknown/path']}>
          <AppRoutes />
        </MemoryRouter>
      </AppProviders>
    );
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});