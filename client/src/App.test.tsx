import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./Board', () => {
  return function DummyBoard({ grid }: { grid: number[][] }) {
    return <div data-testid="mock-board">Board with {grid.length} rows</div>;
  };
});

const mockFetch = jest.fn();
global.fetch = mockFetch as any;

beforeEach(() => {
  mockFetch.mockClear();
});

describe('App', () => {
  test('happy path: fetches and displays puzzle', async () => {
    const puzzle = [[5, 3, 0], [6, 0, 0], [0, 9, 8]];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ puzzle }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('mock-board')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('mock-board')).toHaveTextContent(`Board with ${puzzle.length} rows`);
  });

  test('error path: displays error when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch puzzle')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('mock-board')).not.toBeInTheDocument();
  });

  test('error path: displays error when fetch is rejected', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  test('edge case: shows no board when puzzle not loaded yet', () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {})); // forever pending

    render(<App />);

    expect(screen.queryByTestId('mock-board')).not.toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  test('edge case: clicking New Game clears error and fetches again', async () => {
    // first fetch fails
    mockFetch.mockRejectedValueOnce(new Error('First failure'));
    const { rerender } = render(<App />);

    await waitFor(() => {
      expect(screen.getByText('First failure')).toBeInTheDocument();
    });

    // second fetch succeeds
    const puzzle = [[1, 2, 3]];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ puzzle }),
    });

    fireEvent.click(screen.getByText('New Game'));

    await waitFor(() => {
      expect(screen.getByTestId('mock-board')).toBeInTheDocument();
    });

    expect(screen.queryByText('First failure')).not.toBeInTheDocument();
  });

  test('edge case: handles non-Error rejections with Unknown error', async () => {
    mockFetch.mockRejectedValueOnce('bare string');

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Unknown error')).toBeInTheDocument();
    });
  });
});