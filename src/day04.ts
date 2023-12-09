import { main } from './common'

class Card {
  id: number
  winning_numbers: number[]
  having_numbers: number[]

  constructor (line: string) {
    const [id_section, numbers_section] = line.split(':')
    const game_number = id_section.match(/\d+/g)
    if (game_number === null || game_number.length == 0) {
      throw new Error('Invalid card id')
    }
    this.id = Number(game_number[0])
    const [winning_section, having_section] = numbers_section.split('|')
    this.winning_numbers = winning_section.match(/\d+/g)?.map(Number) || []
    this.having_numbers = having_section.match(/\d+/g)?.map(Number) || []
  }

  get n_matches (): number {
    const matching_numbers = this.having_numbers.filter(n => this.winning_numbers.includes(n))
    return matching_numbers.length
  }

  get value (): number {
    const n_matches = this.n_matches
    if (n_matches == 0) {
      return 0
    }
    const card_value = 2 ** (n_matches - 1)
    return card_value
  }
}

export function solve_a (lines: string[]): number {
  const cards: Card[] = lines.map(line => new Card(line))
  console.log(cards[0])
  const card_values = cards.map(card => card.value)
  const sum = card_values.reduce((a, b) => a + b, 0)
  return sum
}

type CardCounts = Record<number, number>

function processCardCollection (cards: Card[]): CardCounts {
  // Initialize with 1 card for each card_id in the input
  const card_counts: CardCounts = {}

  cards.forEach(card => {
    card_counts[card.id] = 1
  })

  for (const card of cards) {
    // step through the cards, adding cards as they are won
    console.log(`card: ${card.id} has ${card.n_matches} matches`)
    for (let i = 1; i <= card.n_matches; i++) {
      if (card.id + i > cards.length) {
        break
      }
      card_counts[card.id + i] += card_counts[card.id]
    }
    // console.log(card_counts);
  }
  return card_counts
}

export function solve_b (lines: string[]): number {
  const cards: Card[] = lines.map(line => new Card(line))
  const card_collection = processCardCollection(cards)
  // get the total number of cards in the collection
  const sum = Object.values(card_collection).reduce((a, b) => a + b, 0)
  return sum
}

if (require.main == module) {
  main('data/input04.txt', [solve_a, solve_b])
}
