import { input } from "./input.env"

import { Point } from "./utils/Point"

function solution(input: string): number {
  const inputArray = input.split('\n')

  const isSymbol = (letter: string) => {
    const ignoreList = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    if (ignoreList.includes(letter)) return false

    const asciiCodeStart = 33 // code in ASCII of the first symbol
    const asciiCodeEnd = 64 // @
    const code = letter.charCodeAt(0)

    return asciiCodeStart <= code && code <= asciiCodeEnd
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

  let partsNumber: number[] = []
  let visited: Point[] = []
  for (let y = 0; y < inputArray.length; y++) {
    const row = inputArray[y]
    for (let x = 0; x < row.length; x++) {
      const letter = row[x]

      if (!isSymbol(letter)) continue

      const adj = getAdjacent(x, y)

      for (const point of adj) {
        if (visited.some(otherPoint => point.equals(otherPoint))) continue

        const part = getPart(inputArray[point.y], point.x)
        if (!part) continue

        partsNumber.push(part.id)
        const [start, end] = part.range

        for (let i = start; i <= end; i++) {
          visited.push(new Point(i, point.y))
        }
      }
    }
  }

  return partsNumber.reduce((sum, number) => sum + number, 0)
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

// const input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`

console.log(solution(input))