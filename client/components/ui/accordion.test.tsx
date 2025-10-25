import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion';

describe('Accordion', () => {
  it('opens and closes the accordion item', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Trigger');
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByText('Content')).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});