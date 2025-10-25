import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';
import { Input } from './input';
import { Button } from './button';

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});

const TestForm = ({ onSubmit }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

describe('Form', () => {
    it('renders the form with its fields', () => {
        render(<TestForm onSubmit={() => {}} />);
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('shadcn')).toBeInTheDocument();
        expect(screen.getByText('This is your public display name.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('shows a validation error for invalid input', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(<TestForm onSubmit={onSubmit} />);

        const input = screen.getByLabelText('Username');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        // Type a single character (invalid)
        await user.type(input, 'a');
        await user.click(submitButton);

        // Check for error message
        expect(await screen.findByText('Username must be at least 2 characters.')).toBeInTheDocument();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('submits successfully with valid input', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(<TestForm onSubmit={onSubmit} />);

        const input = screen.getByLabelText('Username');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await user.type(input, 'testuser');
        await user.click(submitButton);

        // No error message
        expect(screen.queryByText('Username must be at least 2 characters.')).not.toBeInTheDocument();

        // onSubmit should be called with the form data
        expect(onSubmit).toHaveBeenCalledWith({ username: 'testuser' }, expect.any(Object));
    });
});