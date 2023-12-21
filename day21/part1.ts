import { input } from "./input.env"

interface Point {
  i: number,
  j: number
}

function solution(input: string): number {
  const matrix = input.split('\n').map(row => row.split(""))
  const copy = matrix.map(row => row.map(cell => cell))
  const start = find(matrix, 'S')

  const north: Point = { i: -1, j: 0 }
  const east: Point = { i: 0, j: 1 }
  const south: Point = { i: 1, j: 0 }
  const west: Point = { i: 0, j: -1 }
  const isWalkable = (p: Point) => {
    const isEmpty = matrix[p.i][p.j] !== '#'
    return (
      isEmpty &&
      p.i >= 0 &&
      p.j >= 0 &&
      p.i < matrix.length &&
      p.j < matrix[0].length
    )
  }

  const targetSteps = 64
  const queue: Point[] = [start]
  let past: Point[] = []
  let result = 0
  for (let steps = 0; steps < targetSteps; steps++) {
    const toWalk = [...queue]
    const uniques = new PointMap()
    queue.length = 0
    while (toWalk.length > 0) {
      const current = toWalk.shift()
      for (const point of [north, east, south, west]) {
        const newPoint = move(current, point)

        if (!isWalkable(newPoint) || uniques.has(newPoint)) continue

        queue.push(newPoint)
        uniques.set(newPoint)
      }
    }

    result = queue.length
    past = [...queue]
  }

  return result
}

function find(matrix: string[][], char: string): Point {
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {

      if (row[j] === char) return { i, j }
    }
  }
}

function move(a: Point, b: Point): Point {
  return { i: a.i + b.i, j: a.j + b.j }
}

class PointMap {
  private map: Map<number, Set<number>>

  constructor() {
    this.map = new Map<number, Set<number>>()
  }

  set(point: Point) {
    const set = this.map.get(point.i)
    if (set) {
      set.add(point.j)
    } else {
      const newSet = new Set<number>()
      newSet.add(point.j)
      this.map.set(point.i, newSet)
    }
  }

  has(point: Point): boolean {
    const target = this.map.get(point.i)

    if (!target) return false

    return target.has(point.j)
  }
}

console.log(solution(input))