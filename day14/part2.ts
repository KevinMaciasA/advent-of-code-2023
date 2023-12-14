import { input } from "./input.env"

function solution(input: string): void {
  const board = Board.fromString(input)
  const seen = new Map<number, number>()

  const testCycles = 100
  for (let i = 0; i < testCycles; i++) {
    board.cycle()
    const load = board.totalLoad()

    if (seen.has(load)) seen.set(load, seen.get(load) + 1)
    else seen.set(load, 1)
  }
  const sorted = [...seen.entries()].sort((a, b) => b[1] - a[1])

  for (const [load, count] of sorted) {
    console.log(load, count)
  }
  // 96420 3
  // 96546 2
  // 96518 2
  // 96389 2
  // 96317 2

  //Check mannually between most common loads
}

class Board {
  rocks: Rock[]
  matrix: (Rock | string)[][]

  constructor() {
  }

  tilt(direction: "up" | "down" | "left" | "right"): void {
    let someMove = true
    while (someMove) {
      someMove = false
      this.rocks.forEach(rock => {
        someMove ||= rock.go(direction)
      })
    }
  }

  cycle(): void {
    this.tilt('up')
    this.tilt('left')
    this.tilt('down')
    this.tilt('right')
  }

  isOffBoard(i: number, j: number): boolean {
    return i < 0 || j < 0 || i >= this.matrix.length || j >= this.matrix[0].length
  }

  totalLoad(): number {
    return this.rocks.reduce((acc, rock) => acc + rock.load(), 0)
  }

  print(): string {
    const matrix = this.matrix.map(line => line.map(char => {
      if (typeof char === 'string')
        return char

      return char instanceof CubeRock ? '#' : 'O'
    }))
    const str = matrix.map(line => line.join('')).join('\n')
    console.log(str)
    return str
  }

  static fromString(input: string): Board {
    const board = new Board()
    const rocks: Rock[] = []
    const matrix = input
      .split('\n')
      .map((line, i) => line.split('')
        .map((char, j) => {
          let target: string | Rock = char
          if (char === 'O' || char === '#') {
            target = char === 'O' ? new Rock(board, i, j) : new CubeRock(board, i, j) as Rock
            rocks.push(target as Rock)
          }

          return target
        }))

    board.matrix = matrix
    board.rocks = rocks
    return board
  }
}

class Rock {
  position: { i: number, j: number }
  private board: Board

  constructor(board: Board, i: number, j: number) {
    this.position = { i, j }
    this.board = board
  }

  go(direction: "up" | "down" | "left" | "right"): boolean {
    const preview = this.preview(direction)
    if (this.board.isOffBoard(preview.i, preview.j)) {
      return false
    }

    const target = this.board.matrix[preview.i][preview.j]
    if (typeof target !== 'string') return false

    this.delete()
    this.doGo(direction)

    return true
  }

  private doGo(direction: "up" | "down" | "left" | "right"): void {
    switch (direction) {
      case "up":
        this.position.i--
        break
      case "down":
        this.position.i++
        break
      case "left":
        this.position.j--
        break
      case "right":
        this.position.j++
        break
    }
    this.board.matrix[this.position.i][this.position.j] = this
  }

  delete() {
    this.board.matrix[this.position.i][this.position.j] = '.'
  }

  preview(direction: "up" | "down" | "left" | "right"): { i: number, j: number } {
    switch (direction) {
      case "up":
        return { i: this.position.i - 1, j: this.position.j }
      case "down":
        return { i: this.position.i + 1, j: this.position.j }
      case "left":
        return { i: this.position.i, j: this.position.j - 1 }
      case "right":
        return { i: this.position.i, j: this.position.j + 1 }
    }
  }

  load(): number {
    const endI = this.board.matrix.length
    return endI - this.position.i
  }
}

class CubeRock extends Rock {
  constructor(board: Board, i: number, j: number) {
    super(board, i, j)
  }

  go(direction: "up" | "down" | "left" | "right"): boolean {
    return false
  }

  load(): number {
    return 0
  }
}

console.log(solution(input))