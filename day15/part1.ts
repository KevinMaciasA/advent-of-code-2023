import { input } from "./input.env"

function solution(input: string): number {
  const inputArray = input.split(",")
  const hashes = inputArray.map((item) => hashAlgorithm(item))

  return hashes.reduce((sum, curr) => sum + curr, 0)
}

function hashAlgorithm(input: string): number {
  let current = 0
  for (let i = 0; i < input.length; i++) {
    current += input.charCodeAt(i)
    current *= 17
    current %= 256
  }

  return current
}

console.log(solution(input))