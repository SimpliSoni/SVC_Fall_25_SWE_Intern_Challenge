import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar, SidebarProvider } from './sidebar';

describe('Sidebar', () => {
    it('renders its children', () => {
        render(
            <SidebarProvider>
                <Sidebar>
                    <div>Test Content</div>
                </Sidebar>
            </SidebarProvider>
        );
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});