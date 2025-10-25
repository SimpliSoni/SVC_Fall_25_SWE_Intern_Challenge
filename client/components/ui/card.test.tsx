import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';

describe('Card components', () => {
  it('renders Card with children', () => {
    render(<Card><div>child</div></Card>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders CardHeader with children', () => {
    render(<CardHeader><div>child</div></CardHeader>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders CardTitle with children', () => {
    render(<CardTitle><div>child</div></CardTitle>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders CardDescription with children', () => {
    render(<CardDescription><span>child</span></CardDescription>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders CardContent with children', () => {
    render(<CardContent><div>child</div></CardContent>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders CardFooter with children', () => {
    render(<CardFooter><div>child</div></CardFooter>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('applies custom className to Card', () => {
    render(<Card className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });
});