import { input } from "./input.env"
import { Point } from "./utils/Point"

function solution(input: string): number {
  const inputArray = input.split('\n')

  const isSymbol = (letter: string) => {
    return letter === "*"
  }

  const getAdjacent = (x: number, y: number): Point[] => {
    const adj: Point[] = []

    for (let left = x - 1; left <= x + 1; left++) {
      for (let top = y - 1; top <= y + 1; top++) {
        if (left < 0 || top < 0) continue

        if (left >= inputArray[0].length || top >= inputArray.length) continue

        if (left === x && top === y) continue
        adj.push(new Point(left, top))
      }
    }

    return adj
  }

  let gearRatios: number[] = []
  let visited: Point[] = []
  for (let y = 0; y < inputArray.length; y++) {
    const row = inputArray[y]
    for (let x = 0; x < row.length; x++) {
      const letter = row[x]

      if (!isSymbol(letter)) continue

      const adj = getAdjacent(x, y)

      const parts: Part[] = []
      for (const point of adj) {
        if (visited.some(otherPoint => point.equals(otherPoint))) continue

        const part = getPart(inputArray[point.y], point.x)
        if (!part) continue

        parts.push(part)

        const [start, end] = part.range

        for (let i = start; i <= end; i++) {
          visited.push(new Point(i, point.y))
        }
      }

      if (parts.length === 2) gearRatios.push(parts[0].id * parts[1].id)
      parts.length = 0
    }
  }

  return gearRatios.reduce((sum, number) => sum + number, 0)
}

class Part {
  id: number
  range: [number, number]
  constructor(id: number, range: [number, number]) {
    this.id = id
    this.range = range
  }
}

function getPart(row: string, index: number): Part | null {
  if (!row) return null

  const end = row.length - 1

  if (index < 0 || index > end) return null

  const isNumber = (letter: string) => !isNaN(parseInt(letter))

  if (!isNumber(row[index])) return null

  let startIndex = index
  while (isNumber(row[startIndex - 1])) startIndex -= 1

  let endIndex = index
  while (isNumber(row[endIndex + 1])) endIndex += 1

  const slice = row.slice(startIndex, endIndex + 1)
  return new Part(parseInt(slice), [startIndex, endIndex])
}

console.log(solution(input))