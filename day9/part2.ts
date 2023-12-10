import { input } from "./input.env"

function solution(input: string): number {
  const inputArray = input.split('\n')

  const results: number[] = []
  for (const row of inputArray) {
    const numbers = row.split(' ').map(Number)
    const arrayOfDiff = [numbers]
    let current = arrayOfDiff.at(-1)
    while (current.some(d => d !== 0)) {
      const next = getDifferences(current)
      arrayOfDiff.push(next)
      current = next
    }

    results.push(extrapolateLeft(arrayOfDiff))
  }

  return results.reduce((sum, curr) => sum + curr, 0)
}

function getDifferences(numbers: number[]): number[] {
  return numbers.reduce((acc, curr, i, arr) => {
    if (i === 0) return acc
    acc.push(curr - arr[i - 1])
    return acc
  }, [] as number[])
}

function extrapolateRight(numbers: number[][]): number {
  numbers.at(-1).push(0)
  for (let i = numbers.length - 2; i >= 0; i--) {
    const row = numbers[i]
    const pastRow = numbers[i + 1]
    const newNumber = pastRow.at(-1) + row.at(-1)
    row.push(newNumber)
  }

  return numbers[0].at(-1)
}

function extrapolateLeft(numbers: number[][]): number {
  numbers.at(-1).unshift(0)
  for (let i = numbers.length - 2; i >= 0; i--) {
    const row = numbers[i]
    const pastRow = numbers[i + 1]
    const newNumber = row.at(0) - pastRow.at(0)
    row.unshift(newNumber)
  }
  return numbers[0].at(0)
}
console.log(solution(input))