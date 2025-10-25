import { render, screen } from '@testing-library/react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from './resizable';

describe('Resizable', () => {
    it('renders a resizable panel group with panels and a handle', () => {
        render(
            <ResizablePanelGroup
                direction="horizontal"
                className="max-w-md rounded-lg border"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <span className="font-semibold">One</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <span className="font-semibold">Two</span>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        );

        expect(screen.getByText('One')).toBeInTheDocument();
        expect(screen.getByText('Two')).toBeInTheDocument();
        expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('can be rendered vertically', () => {
        render(
            <ResizablePanelGroup direction="vertical">
                <ResizablePanel />
                <ResizableHandle />
                <ResizablePanel />
            </ResizablePanelGroup>
        );
        expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('can render a handle with a grabber icon', () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel />
                <ResizableHandle withHandle />
                <ResizablePanel />
            </ResizablePanelGroup>
        );
        // Check for the div that contains the icon
        expect(screen.getByRole('separator').querySelector('div')).toBeInTheDocument();
    });
});