// Determine which games would have been possible if the bag contained 12 red, 13 green, 14 blue

import { main } from '../common.js'

// a Pull object is a mapping from color to number
interface Pull {
  red?: number
  green?: number
  blue?: number
}

// a Game object has an id and an array of Pulls
class Game {
  id: number
  pulls: Pull[]

  constructor (gameLine: string) {
    this.id = 0
    this.pulls = []
    this.parseGameLine(gameLine)
  }

  private parseGameLine (gameLine: string): void {
    const parts = gameLine.split(': ')
    this.id = parseInt(parts[0].replace('Game ', ''), 10)

    const pullParts = parts[1].split('; ')
    for (const pull of pullParts) {
      this.pulls.push(this.parsePull(pull))
    }
  }

  private parsePull (pull: string): Pull {
    const colors = pull.split(', ')
    const pullResult: Pull = {}

    for (const color of colors) {
      const [amount, colorName] = color.split(' ')
      pullResult[colorName as keyof Pull] = parseInt(amount, 10)
    }

    return pullResult
  }
}

function isValidPull (pull: Pull): boolean {
  // Check if the pull is valid
  const redValid = pull.red === undefined || pull.red <= 12
  const greenValid = pull.green === undefined || pull.green <= 13
  const blueValid = pull.blue === undefined || pull.blue <= 14
  return redValid && greenValid && blueValid
}

function isValidGame (game: Game): boolean {
  // Check if the game is valid
  // A game is valid if all pulls are valid
  const isValid = game.pulls.every((pull) => isValidPull(pull))
  return isValid
}

function minBag (game: Game): Pull {
  const minPull = { red: 0, green: 0, blue: 0 }
  for (const pull of game.pulls) {
    if (pull.red !== undefined && pull.red > minPull.red) {
      minPull.red = pull.red
    }
    if (pull.green !== undefined && pull.green > minPull.green) {
      minPull.green = pull.green
    }
    if (pull.blue !== undefined && pull.blue > minPull.blue) {
      minPull.blue = pull.blue
    }
  }
  return minPull
}

export function solveA (lines: string[]): number {
  // for each line, build a 'game' object
  const games = lines.map((line) => new Game(line))
  const validGames = games.filter((game) => isValidGame(game))
  const validIds = validGames.map((game) => game.id)
  console.log(validIds)
  const sumValidIds = validIds.reduce((a, b) => a + b, 0)
  return sumValidIds
}

export function solveB (lines: string[]): number {
  const games = lines.map((line) => new Game(line))
  const minBags = games.map((game) => minBag(game))
  console.log(minBags)

  const powers = minBags.map((pull) => {
    const red = pull.red ?? 1
    const green = pull.green ?? 1
    const blue = pull.blue ?? 1
    return red * green * blue
  })

  const sumPowers = powers.reduce((a, b) => a + b, 0)
  return sumPowers
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main('data/input02.txt', [solveA, solveB])
}
