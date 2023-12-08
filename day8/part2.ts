import { input } from "./input.env"
import { lcmOfArray } from "./utils/lcm"

function solution(input: string): number {
  const inputArray = input.split('\n\n')

  const [pattern, pathsInfo] = inputArray
  const pathInfo = pathsInfo.split('\n')

  const start = 'A'
  const end = 'Z'

  const startPaths: Set<string> = pathInfo.reduce((paths: Set<string>, row) => {
    const [from, to] = row.split(' = ')
    const last = from.at(-1)

    if (last !== start) return paths

    paths.add(from)
    return paths
  }, new Set<string>())

  const reducer = (paths: Map<string, Fork>, row) => {
    const [from, to] = row.split(' = ')
    const [left, right] = stringBewteen(to, '(', ')').split(', ')
    paths.set(from, new Fork({ from, left, right }))
    return paths
  }

  const paths: Map<string, Fork> = pathInfo.reduce(reducer, new Map())

  const results = []
  for (const start of startPaths) {
    let steps = 0
    let index = 0
    let current: Fork = paths.get(start)
    while (current.from.at(-1) !== end) {
      const direction = pattern[index]
      const next = current.go(direction)
      current = paths.get(next)
      index = (index + 1) % pattern.length
      steps += 1
    }
    results.push(steps)
  }

  return lcmOfArray(results)
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