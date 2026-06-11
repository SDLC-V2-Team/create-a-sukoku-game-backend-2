import React from 'react';
import { render, screen } from '@testing-library/react';
import Cell from './Cell';

describe('Cell component', () => {
  it('renders the value when it is non-zero', () => {
    render(<Cell value={5} />);
    const cell = screen.getByRole('cell');
    expect(cell).toHaveTextContent('5');
    expect(cell).toHaveClass('filled');
  });

  it('renders empty string and "empty" class when value is 0', () => {
    render(<Cell value={0} />);
    const cell = screen.getByRole('cell');
    expect(cell).toHaveTextContent('');
    expect(cell).toHaveClass('empty');
  });

  it('renders negative numbers', () => {
    render(<Cell value={-7} />);
    const cell = screen.getByRole('cell');
    expect(cell).toHaveTextContent('-7');
    expect(cell).toHaveClass('filled');
  });

  it('renders large numbers', () => {
    render(<Cell value={9999} />);
    const cell = screen.getByRole('cell');
    expect(cell).toHaveTextContent('9999');
  });

  it('has proper td element', () => {
    render(<Cell value={1} />);
    const cell = screen.getByRole('cell');
    expect(cell.tagName).toBe('TD');
  });
});