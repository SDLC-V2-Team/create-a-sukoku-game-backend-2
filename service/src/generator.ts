import { createEmptyBoard, isValidMove, solve } from './board'

function shuffleArray(array: number[]): number[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function fillBoard(board: number[][]): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        const nums = shuffleArray([1,2,3,4,5,6,7,8,9])
        for (const num of nums) {
          if (isValidMove(board, r, c, num)) {
            board[r][c] = num
            if (fillBoard(board)) return true
            board[r][c] = 0
          }
        }
        return false
      }
    }
  }
  return true
}

export function generatePuzzle(): number[][] {
  const solved = createEmptyBoard()
  fillBoard(solved)

  // Create puzzle by removing cells (without uniqueness check for simplicity)
  const puzzle = solved.map(row => [...row])
  let cellsToRemove = 50 // Adjust difficulty
  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0
      cellsToRemove--
    }
  }

  return puzzle
}