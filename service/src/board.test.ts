import { createEmptyBoard, isValidMove, solve } from './board';

describe('createEmptyBoard', () => {
  it('should return a 9x9 board filled with zeros', () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(9);
    board.forEach(row => {
      expect(row).toHaveLength(9);
      row.forEach(cell => expect(cell).toBe(0));
    });
  });
});

describe('isValidMove', () => {
  let board: number[][];

  beforeEach(() => {
    board = createEmptyBoard();
  });

  it('should return true for a valid placement on an empty board', () => {
    expect(isValidMove(board, 0, 0, 5)).toBe(true);
  });

  it('should return false if the number already exists in the same row', () => {
    board[0][1] = 5;
    expect(isValidMove(board, 0, 0, 5)).toBe(false);
  });

  it('should return false if the number already exists in the same column', () => {
    board[1][0] = 5;
    expect(isValidMove(board, 0, 0, 5)).toBe(false);
  });

  it('should return false if the number already exists in the 3x3 subgrid', () => {
    board[1][1] = 5;
    expect(isValidMove(board, 0, 0, 5)).toBe(false);
  });
});

describe('solve', () => {
  it('should solve an empty board and return true', () => {
    const board = createEmptyBoard();
    const solved = solve(board);
    expect(solved).toBe(true);

    // Verify no zeros remain
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        expect(board[r][c]).toBeGreaterThanOrEqual(1);
        expect(board[r][c]).toBeLessThanOrEqual(9);
      }
    }
    // Verify each row, column, subgrid is valid (spot check a few)
    for (let r = 0; r < 9; r++) {
      const rowSet = new Set(board[r]);
      expect(rowSet.size).toBe(9);
    }
  });

  it('should return false for an unsolvable board (conflicting numbers)', () => {
    const board = createEmptyBoard();
    // Force a conflict: same number twice in first row
    board[0][0] = 5;
    board[0][1] = 5;
    expect(solve(board)).toBe(false);
  });
});