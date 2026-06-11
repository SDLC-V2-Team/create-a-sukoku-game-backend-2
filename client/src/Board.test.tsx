import React from 'react'
import { render, screen } from '@testing-library/react'
import Board from './Board'

describe('Board component', () => {
  it('renders a 9x9 grid with correct values', () => {
    const grid = Array.from({ length: 9 }, (_, ri) =>
      Array.from({ length: 9 }, (_, ci) => ri * 10 + ci)
    )
    render(<Board grid={grid} />)
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    const rows = table.querySelectorAll('tr')
    expect(rows).toHaveLength(9)
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td')
      expect(cells).toHaveLength(9)
      cells.forEach((cell, colIndex) => {
        expect(cell).toHaveTextContent(String(rowIndex * 10 + colIndex))
      })
    })
  })

  it('renders correctly with an empty grid', () => {
    const grid: number[][] = []
    render(<Board grid={grid} />)
    const table = screen.getByRole('table')
    const rows = table.querySelectorAll('tr')
    expect(rows).toHaveLength(0)
  })

  it('renders a grid containing zeros (empty cells)', () => {
    const grid = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => 0)
    )
    render(<Board grid={grid} />)
    const table = screen.getByRole('table')
    const rows = table.querySelectorAll('tr')
    expect(rows).toHaveLength(9)
    rows.forEach(row => {
      const cells = row.querySelectorAll('td')
      expect(cells).toHaveLength(9)
      cells.forEach(cell => {
        expect(cell).toHaveTextContent('0')
      })
    })
  })

  it('throws an error when grid prop is undefined', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Board grid={undefined as any} />)).toThrow()
    consoleError.mockRestore()
  })
})