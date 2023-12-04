import { input } from "./input.env"

function solution(input: string): number {
  const inputArray = input.split('\n')

  const cards: Map<number, ScratchCards> = new Map()
  for (const row of inputArray) {
    const [card, numbers] = row.split(': ')
    const id = parseInt(card.slice(5).replace(' ', ''))
    const [leftNumbers, rightNumbers] = numbers.split(' | ')

    const reducer = (numbers: number[], str: string) => {
      const number = parseInt(str)

      if (isNaN(number)) return numbers
      return [...numbers, number]
    }
    const winningNumbers = leftNumbers.split(' ').reduce(reducer, [])
    const myNumbers = rightNumbers.split(' ').reduce(reducer, [])

    const n = myNumbers.filter(numbers => winningNumbers.includes(numbers)).length

    const cratchCard = new ScratchCards(id, n)
    cards.set(id, cratchCard)
  }

  for (const [_, scratchCard] of cards) {
    const prizesInfo = scratchCard.generatePrizes()

    for (const prizeInfo of prizesInfo) {
      const { id, prize } = prizeInfo
      const targetCard = cards.get(id)

      if (!targetCard) break

      targetCard.add(prize)
    }
  }

  const cardsArray = [...cards.values()]
  return cardsArray.reduce((sum, card) => sum + card.instances, 0)
}

class ScratchCards {
  id: number
  instances: number
  copiesWon: number

  constructor(id: number, copiesWon: number = 0) {
    this.id = id
    this.copiesWon = copiesWon
    this.instances = 1
  }

  generatePrizes(): { id: number, prize: number }[] {
    return Array.from(
      { length: this.copiesWon },
      (_, i) => ({ id: this.id + (i + 1), prize: 1 * this.instances })
    )
  }

  add(n: number = 1) {
    this.instances += n
  }
}

console.log(solution(input))