import Cell from './Cell'
import './Board.css'

interface BoardProps {
  grid: number[][]
}

function Board({ grid }: BoardProps) {
  return (
    <table className="board">
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((value, colIndex) => (
              <Cell key={colIndex} value={value} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Board