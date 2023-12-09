// import { main } from './common'

class Card {
  id: number
  winning_numbers: number[]
  having_numbers: number[]

  constructor (line: string) {
    const [idSection, numbersSection] = line.split(':')
    const gameNumber = idSection.match(/\d+/g)
    if (gameNumber === null || gameNumber.length === 0) {
      throw new Error('Invalid card id')
    }
    this.id = Number(gameNumber[0])
    const [winningSection, havingSection] = numbersSection.split('|')
    this.winning_numbers = winningSection.match(/\d+/g)?.map(Number) ?? []
    this.having_numbers = havingSection.match(/\d+/g)?.map(Number) ?? []
  }

  get n_matches (): number {
    const matchingNumbers = this.having_numbers.filter((n) =>
      this.winning_numbers.includes(n)
    )
    return matchingNumbers.length
  }

  get value (): number {
    const nMatches = this.n_matches
    if (nMatches === 0) {
      return 0
    }
    const cardValue = 2 ** (nMatches - 1)
    return cardValue
  }
}

export function solveA (lines: string[]): number {
  const cards: Card[] = lines.map((line) => new Card(line))
  console.log(cards[0])
  const cardValues = cards.map((card) => card.value)
  const sum = cardValues.reduce((a, b) => a + b, 0)
  return sum
}

type CardCounts = Record<number, number>

function processCardCollection (cards: Card[]): CardCounts {
  // Initialize with 1 card for each card_id in the input
  const cardCounts: CardCounts = {}

  cards.forEach((card) => {
    cardCounts[card.id] = 1
  })

  for (const card of cards) {
    // step through the cards, adding cards as they are won
    console.log(`card: ${card.id} has ${card.n_matches} matches`)
    for (let i = 1; i <= card.n_matches; i++) {
      if (card.id + i > cards.length) {
        break
      }
      cardCounts[card.id + i] += cardCounts[card.id]
    }
    // console.log(card_counts);
  }
  return cardCounts
}

export function solveB (lines: string[]): number {
  const cards: Card[] = lines.map((line) => new Card(line))
  const cardCollection = processCardCollection(cards)
  // get the total number of cards in the collection
  const sum = Object.values(cardCollection).reduce((a, b) => a + b, 0)
  return sum
}

// if (require.main === module) {
//   main('data/input04.txt', [solveA, solveB])
// }
