import { input } from "./input.env"

class GameInfo {
  id: number
  red: number
  green: number
  blue: number

  constructor(id: number) {
    this.id = id
    this.red = 0
    this.green = 0
    this.blue = 0
  }
}

function solution(input: string): number {
  const problemLimits = {
    red: 12,
    green: 13,
    blue: 14
  }

  const games = input.split('\n')

  const gamesInfo = games.map((game) => {
    const [gameName, gameResults] = game.split(': ')
    const [_game, id] = gameName.split(' ')
    const gameInfo = new GameInfo(parseInt(id))

    const regex = /(\d+) (\w+)/g // examples: 1 blue, 2 green, 6 blue
    const resultArray = gameResults.match(regex)
    resultArray.forEach((result) => {
      const [stringNumber, color] = result.split(' ')
      const number = parseInt(stringNumber)
      gameInfo[color] = number > gameInfo[color] ? number : gameInfo[color]
    })

    return gameInfo
  })

  const possibleGame = gamesInfo.filter((game) => {
    const isRedOk = game.red <= problemLimits.red
    const isGreenOk = game.green <= problemLimits.green
    const isBlueOk = game.blue <= problemLimits.blue

    return isRedOk && isGreenOk && isBlueOk
  })

  return possibleGame.reduce((sum, game) => sum + game.id, 0)
}

console.log(solution(input))