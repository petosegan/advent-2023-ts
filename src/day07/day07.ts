import { main } from '../common.js'
import * as fs from 'fs'

enum HandKind {
    HighCard = 1,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind
}

class Hand {
    cards: string;
    bid: number;
    kind: HandKind;

    constructor(line: string) {
        const [cards, bid] = line.split(' ')
        this.cards = cards
        this.bid = parseInt(bid)
        this.kind = this.classifyHand()
    }

    parseCard(cardChar: string): number {
        switch (cardChar) {
            case 'T':
                return 10
            case 'J':
                return 11
            case 'Q':
                return 12
            case 'K':
                return 13
            case 'A':
                return 14
            default:
                return parseInt(cardChar)
        }
    }

    asArray(): number[] {
        // map letters to numbers, and parse digits
        return this.cards.split('').map((card) => {
            if (isNaN(parseInt(card))) {
                return this.parseCard(card)
            } else {
                return parseInt(card)
            }
        })
    }

    classifyHand(): HandKind {
        /// classify the hand as a poker hand
        const cardCounts = this.cards.split('').reduce((prev, curr) => {
            if (prev[curr]) {
                prev[curr] += 1
            } else {
                prev[curr] = 1
            }
            return prev
        }, {} as Record<string, number>)
        const cardCountsArray = Object.values(cardCounts)
        const cardCountsArraySorted = cardCountsArray.sort((a, b) => b - a)
        const cardCountsArraySortedLength = cardCountsArraySorted.length
        const maxCount = Math.max(...cardCountsArray)
        if (maxCount === 5) {
            return HandKind.FiveOfAKind
        }
        if (maxCount === 4) {
            return HandKind.FourOfAKind
        }
        if (maxCount === 3) {
            if (cardCountsArraySortedLength === 2) {
                return HandKind.FullHouse
            }
            return HandKind.ThreeOfAKind
        }
        if (maxCount === 2) {
            if (cardCountsArraySortedLength === 3) {
                return HandKind.TwoPair
            }
            return HandKind.OnePair
        }
        return HandKind.HighCard
    }
}

class HandWithJokers extends Hand {
    parseCard(cardChar: string): number {
        switch (cardChar) {
            case 'T':
                return 10
            case 'J':
                return 1
            case 'Q':
                return 12
            case 'K':
                return 13
            case 'A':
                return 14
            default:
                return parseInt(cardChar)
        }
    }

    classifyHand(): HandKind {
        /// classify the hand as a poker hand
        // But J is wild
        if (this.cards === 'JJJJJ') {
            return HandKind.FiveOfAKind
        }
        const cardCounts = this.cards.split('').reduce((prev, curr) => {
            if (prev[curr]) {
                prev[curr] += 1
            } else {
                prev[curr] = 1
            }
            return prev
        }, {} as Record<string, number>)
        // remove J from the cardCounts
        const nJokers = cardCounts['J']
        delete cardCounts['J']

        const cardCountsArray = Object.values(cardCounts)
        const cardCountsArraySorted = cardCountsArray.sort((a, b) => b - a)
        const cardCountsArraySortedLength = cardCountsArraySorted.length
        const maxCount = Math.max(...cardCountsArray) + (nJokers ?? 0)
        if (maxCount === 5) {
            return HandKind.FiveOfAKind
        }
        if (maxCount === 4) {
            return HandKind.FourOfAKind
        }
        if (maxCount === 3) {
            if (cardCountsArraySortedLength === 2) {
                return HandKind.FullHouse
            }
            return HandKind.ThreeOfAKind
        }
        if (maxCount === 2) {
            if (cardCountsArraySortedLength === 3) {
                return HandKind.TwoPair
            }
            return HandKind.OnePair
        }
        return HandKind.HighCard
    }
}

function sortHands(handA: Hand, handB: Hand): number {
    if (handA.kind < handB.kind) {
        return -1
    } else if (handA.kind > handB.kind) {
        return 1
    } else {
        const handACards = handA.asArray()
        const handBCards = handB.asArray()
        // compare arrays lexicographically
        for (let i = 0; i < handACards.length; i++) {
            if (handACards[i] < handBCards[i]) {
                return -1
            } else if (handACards[i] > handBCards[i]) {
                return 1
            }
        }
    }
    return 0
}

function solveA(input: string[]): number {
    const hands = input.map(line => new Hand(line))
    const sortedHands = hands.sort(sortHands)
    console.log(sortedHands)
    // multiply the bid of each hand by its rank, and sum
    const result = sortedHands.reduce((prev, curr, index) => prev + (curr.bid * (index + 1)), 0)
    return result
}

function solveB(input: string[]): number {
    const hands = input.map(line => new HandWithJokers(line))
    const sortedHands = hands.sort(sortHands)
    console.log(sortedHands)
    // write the sortedHands to a logfile
    // const logfile = fs.createWriteStream('data/day07.log', {flags: 'a'})
    // logfile.write(sortedHands.map(hand => `${hand.cards} ${hand.bid} ${hand.kind}`).join('\n'))
    // multiply the bid of each hand by its rank, and sum
    const result = sortedHands.reduce((prev, curr, index) => prev + (curr.bid * (index + 1)), 0)
    return result
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main('data/input07.txt', [solveA, solveB])
}

export {HandKind, Hand, sortHands, HandWithJokers}