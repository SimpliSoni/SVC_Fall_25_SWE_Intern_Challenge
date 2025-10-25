import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './alert-dialog';

describe('AlertDialog', () => {
    it('opens and closes the dialog', async () => {
        const user = userEvent.setup();
        render(
            <AlertDialog>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );

        // Check that the dialog is initially closed
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

        // Open the dialog
        await user.click(screen.getByText('Open'));
        const dialog = screen.getByRole('alertdialog');
        expect(dialog).toBeInTheDocument();

        // Check for content
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
        expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();

        // Click cancel to close
        await user.click(screen.getByText('Cancel'));
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

        // Re-open and click continue to close
        await user.click(screen.getByText('Open'));
        await user.click(screen.getByText('Continue'));
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
});