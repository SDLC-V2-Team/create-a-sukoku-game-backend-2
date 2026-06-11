# Sudoku Game Service

This is the backend service for generating Sudoku puzzles.
It exposes a REST API endpoint to retrieve a new puzzle.

## Tech Stack
- Node.js with Express
- TypeScript

## Endpoint
`GET /api/puzzle` returns a JSON object with a `puzzle` field containing a 9x9 matrix of integers (0 for empty cells).

## Setup
```bash
npm install
npm run dev
```

The service runs on port 5000 by default.

## Build for Production
```bash
npm run build
npm start
```

## Implementation Notes
- The puzzle is generated using a backtracking algorithm to fill a complete board, then some cells are removed.
- The current implementation does **not** guarantee a unique solution; a full uniqueness check can be added using the `solve` function with a solution counter.