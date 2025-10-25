import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

describe('Tabs', () => {
  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>Account content</div>
        </TabsContent>
        <TabsContent value="password">
          <div>Password content</div>
        </TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Account content')).toBeInTheDocument();
    expect(screen.queryByText('Password content')).not.toBeInTheDocument();

    await user.click(screen.getByText('Password'));

    expect(screen.queryByText('Account content')).not.toBeInTheDocument();
    expect(screen.getByText('Password content')).toBeInTheDocument();
  });
});