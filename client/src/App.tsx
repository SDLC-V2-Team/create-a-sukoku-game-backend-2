import { useState, useEffect } from 'react'
import Board from './Board'
import './App.css'

interface PuzzleResponse {
  puzzle: number[][]
}

function App() {
  const [board, setBoard] = useState<number[][] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchPuzzle = async () => {
    try {
      const response = await fetch('/api/puzzle')
      if (!response.ok) {
        throw new Error('Failed to fetch puzzle')
      }
      const data: PuzzleResponse = await response.json()
      setBoard(data.puzzle)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  useEffect(() => {
    fetchPuzzle()
  }, [])

  return (
    <div className="app">
      <h1>Sudoku Game</h1>
      {error && <p className="error">{error}</p>}
      {board && <Board grid={board} />}
      <button onClick={fetchPuzzle}>New Game</button>
    </div>
  )
}

export default App