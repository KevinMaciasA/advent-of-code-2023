import { input } from "./input.env"
import { Speller } from "./utils/Speller"
import { reverseTrieForNumbers, trieForNumbers } from "./utils/trieForNumbers"
import { traslator } from "./utils/wordToNumber"

function solution(input: string): number {
  const codes: string[] = input.split('\n')

  const getValue = (code: string) => {
    const speller = new Speller(trieForNumbers)
    const reversedSpeller = new Speller(reverseTrieForNumbers)
    let first: number | undefined
    let last: number | undefined

    for (let i = 0; i < code.length; i++) {
      const leftValue = code[i]
      const rightValue = code[(code.length - 1) - i]
      const leftNumber = parseInt(leftValue)
      const rightNumber = parseInt(rightValue)

      if (!first) {
        const spellValue = speller.spell(leftValue)
        if (spellValue) first = traslator.get(spellValue)
        else if (Number.isInteger(leftNumber)) first = leftNumber
      }

      if (!last) {
        const reversedSpellValue = reversedSpeller.spell(rightValue)
        if (reversedSpellValue) last = traslator.get(reversedSpellValue)
        else if (Number.isInteger(rightNumber)) last = rightNumber
      }

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