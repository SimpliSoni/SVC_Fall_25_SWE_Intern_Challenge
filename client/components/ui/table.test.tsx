import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';

describe('Table components', () => {
  it('renders Table with children', () => {
    render(<Table><tbody><tr><td>child</td></tr></tbody></Table>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders TableHeader with children', () => {
    render(<table><TableHeader><tr><th>child</th></tr></TableHeader></table>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders TableBody with children', () => {
    render(<table><TableBody><tr><td>child</td></tr></TableBody></table>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders TableFooter with children', () => {
    render(<table><TableFooter><tr><td>child</td></tr></TableFooter></table>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders TableHead with children', () => {
    render(<table><thead><tr><TableHead>child</TableHead></tr></thead></table>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders TableRow with children', () => {
    render(<table><tbody><TableRow><td>child</td></TableRow></tbody></table>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders TableCell with children', () => {
    render(<table><tbody><tr><TableCell>child</TableCell></tr></tbody></table>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders TableCaption with children', () => {
    render(<table><TableCaption>child</TableCaption></table>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('applies custom className to Table', () => {
    render(<Table className="custom-class" />);
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });
});