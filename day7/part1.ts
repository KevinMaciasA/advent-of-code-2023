import { input } from "./input.env"

function solution(input: string): number {
  const inputArray = input.split('\n')

  const plays = inputArray.map((row) => {
    const [hand, bid] = row.split(' ')
    return new Play(hand, parseInt(bid))
  })

  const sortedPlays = [...plays].sort((a, b) => {
    const diff = a.strength - b.strength

    if (diff !== 0) return diff

    for (let i = 0; i < a.cards.length; i++) {
      const cardA = a.cards[i]
      const cardB = b.cards[i]
      if (cardA === cardB) continue

      return a.table[cardA] - b.table[cardB]
    }
  })

  return sortedPlays.reduce((acc, play, i) => {
    const winnings = play.bid * (i + 1)
    return acc + winnings
  }, 0)
}

class Play {
  cards: string
  bid: number
  strength: number
  table: { [key: string]: number }

  constructor(cards: string, bid: number) {
    this.cards = cards
    this.bid = bid
    this.table = {
      'A': 14,
      'K': 13,
      'Q': 12,
      'J': 11,
      'T': 10,
      '9': 9,
      '8': 8,
      '7': 7,
      '6': 6,
      '5': 5,
      '4': 4,
      '3': 3,
      '2': 2,
    }
    this.strength = this.getStrength()
  }

  getStrength() {
    const map = new Map()
    for (const card of this.cards) {
      if (!map.has(card)) {
        map.set(card, 1)
      } else {
        map.set(card, map.get(card) + 1)
      }
    }

    let strength = 0
    for (const [key, value] of map) {
      if (value === 5) strength += 2000
      if (value === 4) strength += 1000
      if (value === 3) strength += 500
      if (value === 2) strength += 200
    }

    return strength
  }
}

console.log(solution(input))