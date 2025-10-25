import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './alert';

describe('Alert components', () => {
  it('renders Alert with children', () => {
    render(<Alert><div>child</div></Alert>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders AlertTitle with children', () => {
    render(<AlertTitle><div>child</div></AlertTitle>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders AlertDescription with children', () => {
    render(<AlertDescription><div>child</div></AlertDescription>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('applies custom className to Alert', () => {
    render(<Alert className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies the destructive variant class', () => {
    render(<Alert variant="destructive" />);
    expect(document.querySelector('.text-destructive')).toBeInTheDocument();
  });
});