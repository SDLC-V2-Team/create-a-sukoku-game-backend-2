import express from 'express'
import cors from 'cors'
import { generatePuzzle } from './generator'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/puzzle', (req, res) => {
  try {
    const puzzle = generatePuzzle()
    res.json({ puzzle })
  } catch (error) {
    console.error('Failed to generate puzzle:', error)
    res.status(500).json({ error: 'Failed to generate puzzle' })
  }
})

app.listen(PORT, () => {
  console.log(`Sudoku service running on http://localhost:${PORT}`)
})

export default app