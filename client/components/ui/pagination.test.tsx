import { render, screen } from '@testing-library/react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './pagination';

describe('Pagination', () => {
    it('renders a full pagination component', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
        expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
        expect(screen.getByText('More pages')).toBeInTheDocument();
    });

    it('renders an active link', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        const link = screen.getByText('2');
        expect(link).toHaveAttribute('aria-current', 'page');
    });

    it('renders disabled links', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" aria-disabled />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" aria-disabled />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        expect(screen.getByLabelText('Go to previous page').closest('a')).toHaveAttribute('aria-disabled', 'true');
        expect(screen.getByLabelText('Go to next page').closest('a')).toHaveAttribute('aria-disabled', 'true');
    });
});