import * as fs from 'node:fs';

interface Point {
  i: number
  j: number
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

function solution(input: string): number {
  const matrix = Matrix.fromString(input)

  return matrix.solve()
}

class Matrix {
  items: (string | Mirror | Splitter)[][]
  visited: Direction[][][]
  beams: Beam[] = []

  constructor(items: (string | Mirror | Splitter)[][] = []) {
    this.items = items
    this.visited = items.map((row) => row.map(() => [] as Direction[]))
  }

  static fromString(input: string): Matrix {
    const items = input.split('\r\n').map((row, i) => row.split('').map((char, j) => {
      if (char === '/') return new MirrorSlash({ i, j })
      if (char === '\\') return new MirrorBackslash({ i, j })
      if (char === '|') return new ISplitter({ i, j })
      if (char === '-') return new DashSplitter({ i, j })
      return char
    }))

    return new Matrix(items)
  }

  isOutOfBounds(point: Point): boolean {
    return point.i < 0 || point.i >= this.items.length || point.j < 0 || point.j >= this.items[0].length
  }

  add(beam: Beam): void {
    this.beams.push(beam)
  }

  delete(beam: Beam): void {
    this.beams = this.beams.filter(b => b !== beam)
  }

  private init() {
    // start on the top-left corner outside the matrix and go right
    const start: Beam = new Beam({ i: 0, j: -1 }, 'right')
    start.link(this)
    this.add(start)
  }

  solve() {
    this.init()

    let results: boolean[] = this.runAll()
    while (results.some(result => result)) {
      results = this.runAll()
    }

    console.log(this.toString())
    return this.toString().split('').filter(char => char === '#').length
  }

  shouldVisit(point: Point, direction: Direction): boolean {
    if (this.isOutOfBounds(point)) return false

    const item = this.items[point.i][point.j]
    const isNothing = item === '.'

    if (isNothing && this.visited[point.i][point.j].includes(direction)) return false

    return true
  }

  visit(point: Point, direction: Direction): void {
    if (!this.shouldVisit(point, direction)) return

    this.visited[point.i][point.j].push(direction)
  }

  private runAll(): boolean[] {
    return this.beams.map(beam => {
      if (!beam.extend()) {
        this.delete(beam)
        return false
      }

      const item = this.items[beam.head.i][beam.head.j]
      if (item instanceof Mirror) {
        const newBeam = item.reflect(beam)
        newBeam.link(this)
        this.add(newBeam)
        this.delete(beam)
      }

      if (item instanceof Splitter) {
        const maybeNew = item.split(beam)

        if (beam === maybeNew) return true

        const newBeams = maybeNew as Beam[]
        this.delete(beam)

        newBeams.forEach(newBeam => {
          newBeam.link(this)
          this.add(newBeam)
        })
      }

      return true
    })
  }

  toString(): string {
    return this.visited
      .map(row => row.map(cell => cell.length > 0 ? "#" : ".").join(""))
      .join('\n')
  }
}

class Beam {
  head: Point
  body: Point[] = []
  direction: Direction
  matrix: Matrix

  constructor(head: Point, direction: Direction, matrix?: Matrix) {
    this.head = head
    this.direction = direction
    this.matrix = matrix ?? null
  }

  stop(): void {
    this.direction = 'none'
  }

  link(matrix: Matrix): void {
    this.matrix = matrix
    this.matrix.visit(this.head, this.direction)
  }

  extend(): boolean {
    if (this.direction === 'none') return false

    const newPosition: Point = { ...this.head }
    switch (this.direction) {
      case 'up':
        newPosition.i--
        break
      case 'down':
        newPosition.i++
        break
      case 'left':
        newPosition.j--
        break
      case 'right':
        newPosition.j++
        break
    }

    if (!this.matrix.shouldVisit(newPosition, this.direction)) return false

    this.body.push(this.head)
    this.head = newPosition
    this.matrix.visit(this.head, this.direction)

    return true
  }

  headIsOn(point: Point): boolean {
    return this.head.i === point.i && this.head.j === point.j
  }

  history(): Point[] {
    return this.body.concat(this.head)
  }
}

abstract class Splitter {
  position: Point

  constructor(position: Point) {
    this.position = position
  }

  abstract split(beam: Beam): Beam[] | Beam
}

class ISplitter extends Splitter {
  split(beam: Beam): Beam[] | Beam {
    const sides: Direction[] = ['left', 'right']

    if (!sides.includes(beam.direction)) return beam

    return [new Beam(this.position, 'up'), new Beam(this.position, 'down')]
  }
}

class DashSplitter extends Splitter {
  split(beam: Beam): Beam[] | Beam {
    const sides: Direction[] = ['up', 'down']

    if (!sides.includes(beam.direction)) return beam

    return [new Beam(this.position, 'left'), new Beam(this.position, 'right')]
  }
}

abstract class Mirror {
  position: Point

  constructor(position: Point) {
    this.position = position
  }

  abstract reflect(beam: Beam): Beam
}

class MirrorSlash extends Mirror {
  reflect(beam: Beam): Beam {
    if (beam.direction === 'right') return new Beam(this.position, 'up')
    if (beam.direction === 'up') return new Beam(this.position, 'right')
    if (beam.direction === 'left') return new Beam(this.position, 'down')
    if (beam.direction === 'down') return new Beam(this.position, 'left')
  }
}

class MirrorBackslash extends Mirror {
  reflect(beam: Beam): Beam {
    if (beam.direction === 'right') return new Beam(this.position, 'down')
    if (beam.direction === 'down') return new Beam(this.position, 'right')
    if (beam.direction === 'left') return new Beam(this.position, 'up')
    if (beam.direction === 'up') return new Beam(this.position, 'left')
  }
}

const input = fs.readFileSync('day16/input.env.txt').toString()
console.log(solution(input))