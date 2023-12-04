import { input } from "./input.env"

function solution(input: string): number {
  const inputArray = input.split('\n')

  const calculatePoints = (n: number) => {
    if (n === 0) return 0
    return 2 ** (n - 1)
  }

  const cardPoints: number[] = []
  for (const row of inputArray) {
    const [card, numbers] = row.split(': ')
    const [leftNumbers, rightNumbers] = numbers.split(' | ')

    const reducer = (numbers: number[], str: string) => {
      const number = parseInt(str)

      if (isNaN(number)) return numbers
      return [...numbers, number]
    }
    const winningNumbers = leftNumbers.split(' ').reduce(reducer, [])
    const myNumbers = rightNumbers.split(' ').reduce(reducer, [])

    const n = myNumbers.filter(numbers => winningNumbers.includes(numbers)).length
    const points = calculatePoints(n)
    cardPoints.push(points)
  }

  return cardPoints.reduce((sum, curr) => sum + curr, 0)
}

console.log(solution(input))