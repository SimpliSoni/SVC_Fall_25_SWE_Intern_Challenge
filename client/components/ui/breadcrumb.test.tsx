import { render, screen } from '@testing-library/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './breadcrumb';

describe('Breadcrumb', () => {
    it('renders a complete breadcrumb structure', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'breadcrumb');
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Current Page')).toBeInTheDocument();
        // The separator is rendered with a role of 'presentation', which is not in the accessibility tree by default.
        expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument();
    });

    it('renders with custom classNames', () => {
        render(
            <Breadcrumb className="custom-breadcrumb">
                <BreadcrumbList className="custom-list">
                    <BreadcrumbItem className="custom-item">
                        <BreadcrumbLink className="custom-link" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="custom-separator" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="custom-page">Page</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        expect(screen.getByRole('navigation')).toHaveClass('custom-breadcrumb');
        expect(screen.getByRole('list')).toHaveClass('custom-list');
        // The first list item
        expect(screen.getByText('Home').closest('li')).toHaveClass('custom-item');
        expect(screen.getByText('Home')).toHaveClass('custom-link');
        expect(screen.getByRole('presentation', { hidden: true })).toHaveClass('custom-separator');
        expect(screen.getByText('Page')).toHaveClass('custom-page');
    });
});