import { generatePuzzle } from './generator';

describe('generatePuzzle', () => {
  test('happy path: should return a 9x9 grid with numbers 0-9', () => {
    const puzzle = generatePuzzle();
    expect(puzzle).toBeDefined();
    expect(puzzle).toHaveLength(9);
    puzzle.forEach((row) => {
      expect(row).toHaveLength(9);
      row.forEach((cell) => {
        expect(cell).toBeGreaterThanOrEqual(0);
        expect(cell).toBeLessThanOrEqual(9);
      });
    });
    // Should have at least one empty cell (0) and at least one filled cell
    const flat = puzzle.flat();
    expect(flat.some((v) => v === 0)).toBe(true);
    expect(flat.some((v) => v > 0)).toBe(true);
  });

  test('edge case: puzzle should have exactly 50 zeros (50 cells removed)', () => {
    const puzzle = generatePuzzle();
    const flat = puzzle.flat();
    const zeroCount = flat.filter((v) => v === 0).length;
    expect(zeroCount).toBe(50);
  });

  test('error path: function should not throw any error', () => {
    expect(() => generatePuzzle()).not.toThrow();
  });
});