import { input } from "./input.test.env"

function solution(input: string): number {
  const inputArray = input.split('\n\n')

  const [pattern, pathsInfo] = inputArray
  const pathInfo = pathsInfo.split('\n')

  const reducer = (path: Map<string, Fork>, row) => {
    const [from, to] = row.split(' = ')
    const [left, right] = stringBewteen(to, '(', ')').split(', ')
    path.set(from, new Fork({ from, left, right }))
    return path
  }

  const path: Map<string, Fork> = pathInfo.reduce(reducer, new Map())
  const start = 'AAA'
  const end = 'ZZZ'


  let steps = 0
  let index = 0
  let current: Fork = path.get(start)
  while (current.from !== end) {
    const direction = pattern[index]
    const next = current.go(direction)
    current = path.get(next)
    index = (index + 1) % pattern.length
    steps += 1
  }

  return steps
}

function stringBewteen(str: string, start: string, end: string): string {
  const startIndex = str.indexOf(start) + start.length
  const endIndex = str.indexOf(end)
  return str.slice(startIndex, endIndex)
}

class Fork {
  from: string
  left: string
  right: string

  constructor({ from, left, right }: { from: string, left: string, right: string }) {
    this.from = from
    this.left = left
    this.right = right
  }

  go(command: string): string {
    if (command === 'L') return this.left
    if (command === 'R') return this.right
  }
}

console.log(solution(input))