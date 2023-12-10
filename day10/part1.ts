import { input } from "./input.test.env"
import { Pipe } from "./utils/Pipe"
import { Point } from "./utils/Point"

function solution(input: string): number {
  const matrix = input.split("\n").map(row => row.split(""))
  const board = matrix.map((row, y) => row.map((cell, x) => {
    if (Pipe.typeChars.includes(cell))
      return Pipe.fromChar(cell, new Point(x, y))

    return cell
  }))

  const start = findStart(matrix)
  const pipes = getPipes(board, start)

  const anyPipe = pipes[0]
  if (!anyPipe) return 0

  const visited = new Set<Pipe>()
  let currentPipe = anyPipe
  let steps = 0
  while (currentPipe) {
    const nextPipes = getPipes(board, currentPipe.position)
    const nextPipe = nextPipes.find(pipe => !visited.has(pipe) && pipe.canConnect(currentPipe) && currentPipe.canConnect(pipe))
    visited.add(currentPipe)
    currentPipe = nextPipe
    steps += 1
  }

  return Math.round(steps / 2)
}

function findStart(board: string[][]): Point {
  const start = "S"
  for (let y = 0; y < board.length; y++) {
    const row = board[y]

    for (let x = 0; x < row.length; x++) {
      const cell = row[x]

      if (cell === start) {
        return new Point(x, y)
      }
    }
  }

  throw new Error("No start found")

}

function getPipes(board: (Pipe | string)[][], position: Point): Pipe[] {
  const allPipes: Pipe[] = []
  for (let y = -1; y <= 1; y++) {
    if (position.y + y < 0) continue
    if (position.y + y >= board.length) continue

    const row = board[position.y + y]

    for (let x = -1; x <= 1; x++) {
      if (position.x + x < 0) continue
      if (position.x + x >= row.length) continue

      const cell = row[position.x + x]

      if (cell instanceof Pipe) {
        allPipes.push(cell)
      }
    }
  }

  const pipes = allPipes.filter(pipe => pipe.canEnter(position))
  return pipes
}


console.log(solution(input))