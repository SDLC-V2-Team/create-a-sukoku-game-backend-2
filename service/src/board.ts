export function createEmptyBoard(): number[][] {
  return Array.from({ length: 9 }, () => Array(9).fill(0))
}

export function isValidMove(board: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false
  }

  // Check 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3
  const startCol = Math.floor(col / 3) * 3
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === num) return false
    }
  }

  return true
}

export function solve(board: number[][]): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(board, r, c, num)) {
            board[r][c] = num
            if (solve(board)) return true
            board[r][c] = 0
          }
        }
        return false
      }
    }
  }
  return true
}