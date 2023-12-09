// Determine which games would have been possible if the bag contained 12 red, 13 green, 14 blue

import { main } from './common'

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
  const red_valid = pull.red === undefined || pull.red <= 12
  const green_valid = pull.green === undefined || pull.green <= 13
  const blue_valid = pull.blue === undefined || pull.blue <= 14
  return red_valid && green_valid && blue_valid
}

function isValidGame (game: Game): boolean {
  // Check if the game is valid
  // A game is valid if all pulls are valid
  const is_valid = game.pulls.every(pull => isValidPull(pull))
  return is_valid
}

function minBag (game: Game): Pull {
  const min_pull = { red: 0, green: 0, blue: 0 }
  for (const pull of game.pulls) {
    if (pull.red !== undefined && pull.red > min_pull.red) {
      min_pull.red = pull.red
    }
    if (pull.green !== undefined && pull.green > min_pull.green) {
      min_pull.green = pull.green
    }
    if (pull.blue !== undefined && pull.blue > min_pull.blue) {
      min_pull.blue = pull.blue
    }
  }
  return min_pull
}

export function solve_a (lines: string[]): number {
  // for each line, build a 'game' object
  const games = lines.map(line => new Game(line))
  const valid_games = games.filter(game => isValidGame(game))
  const valid_ids = valid_games.map(game => game.id)
  console.log(valid_ids)
  const sum_valid_ids = valid_ids.reduce((a, b) => a + b, 0)
  return sum_valid_ids
}

export function solve_b (lines: string[]): number {
  const games = lines.map(line => new Game(line))
  const min_bags = games.map(game => minBag(game))
  console.log(min_bags)
  const powers = min_bags.map(pull => (pull.red || 1) * (pull.green || 2) * (pull.blue || 1))
  const sum_powers = powers.reduce((a, b) => a + b, 0)
  return sum_powers
}

if (require.main == module) {
  main('data/input02.txt', [solve_a, solve_b])
}
