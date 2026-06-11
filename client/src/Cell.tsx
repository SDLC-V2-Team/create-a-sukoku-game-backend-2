import './Cell.css'

interface CellProps {
  value: number
}

function Cell({ value }: CellProps) {
  return (
    <td className={`cell ${value === 0 ? 'empty' : 'filled'}`}>
      {value !== 0 ? value : ''}
    </td>
  )
}

export default Cell