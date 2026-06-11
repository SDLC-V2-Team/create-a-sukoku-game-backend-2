import request from 'supertest'
import app from './index'

jest.mock('./generator', () => ({
  generatePuzzle: jest.fn()
}))

const mockGeneratePuzzle = require('./generator').generatePuzzle as jest.Mock

describe('GET /api/puzzle', () => {
  beforeEach(() => {
    mockGeneratePuzzle.mockReset()
  })

  it('should return 200 and a puzzle object on success', async () => {
    const puzzle = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]
    mockGeneratePuzzle.mockReturnValue(puzzle)

    const res = await request(app).get('/api/puzzle')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ puzzle })
    expect(mockGeneratePuzzle).toHaveBeenCalledTimes(1)
  })

  it('should return 500 with error message when generatePuzzle throws', async () => {
    mockGeneratePuzzle.mockImplementation(() => {
      throw new Error('Generation failed')
    })

    const res = await request(app).get('/api/puzzle')

    expect(res.status).toBe(500)
    expect(res.body).toEqual({ error: 'Failed to generate puzzle' })
    expect(mockGeneratePuzzle).toHaveBeenCalledTimes(1)
  })

  it('should return 404 for non-GET methods', async () => {
    const res = await request(app).post('/api/puzzle')

    expect(res.status).toBe(404)
    // The route is only defined for GET, so Express returns a 404 with a default body
    expect(mockGeneratePuzzle).not.toHaveBeenCalled()
  })
})