import { input } from "./input.env.ts"

function solution(input: string): number {
  const codes: string[] = input.split('\n')

  const getValue = (code: string) => {
    let first: number | undefined
    let last: number | undefined

    for (let i = 0; i < code.length; i++) {
      const leftValue = code[i]
      const rightValue = code[(code.length - 1) - i]
      const leftNumber = parseInt(leftValue)
      const rightNumber = parseInt(rightValue)

      if (isNaN(leftNumber) && isNaN(rightNumber)) continue

      if (!first && Number.isInteger(leftNumber)) first = leftNumber

      if (!last && Number.isInteger(rightNumber)) last = rightNumber

      if (first && last) break
    }

    const result = parseInt(`${first}${last}`)

    return isNaN(result) ? 0 : result
  }

  return codes.reduce((sum: number, code: string): number => {
    const value = getValue(code)

    return sum + value
  }, 0)
}

console.log(solution(input))