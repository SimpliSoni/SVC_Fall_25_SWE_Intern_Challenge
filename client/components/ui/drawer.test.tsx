import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './drawer';

describe('Drawer', () => {
    const TestDrawer = ({...props}) => (
        <Drawer {...props}>
            <DrawerTrigger asChild>
                <button>Open Drawer</button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Drawer Title</DrawerTitle>
                    <DrawerDescription>Drawer Description</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">Drawer Content</div>
                <DrawerFooter>
                    <button>Submit</button>
                    <DrawerClose asChild>
                        <button>Cancel</button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );

    it('opens the drawer and displays content', async () => {
        const user = userEvent.setup();
        render(<TestDrawer />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        await user.click(screen.getByText('Open Drawer'));

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();

        expect(screen.getByText('Drawer Title')).toBeInTheDocument();
        expect(screen.getByText('Drawer Description')).toBeInTheDocument();
        expect(screen.getByText('Drawer Content')).toBeInTheDocument();
    });

    it('closes the drawer when the close button is clicked', async () => {
        const user = userEvent.setup();
        render(<TestDrawer />);
        await user.click(screen.getByText('Open Drawer'));

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();

        const cancelButton = screen.getByText('Cancel');
        await user.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });
});