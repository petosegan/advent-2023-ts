import {HandKind, Hand, sortHands, HandWithJokers} from './day07.js'

test.each([
    ['32T3K', HandKind.OnePair],
    ['T55J5', HandKind.ThreeOfAKind],
    ['KK677', HandKind.TwoPair],
    ['KTJJT', HandKind.TwoPair],
])(`classifyHand(%s)`, (cards, expected) => {
    const hand = new Hand(cards)
    const thisKind = hand.kind
    expect(thisKind).toEqual(expected)
})

test.each([
    ['32T3K', HandKind.OnePair],
    ['T55J5', HandKind.FourOfAKind],
    ['KK677', HandKind.TwoPair],
    ['KTJJT', HandKind.FourOfAKind],
])(`classifyHandWithJokers(%s)`, (cards, expected) => {
    const hand = new HandWithJokers(cards)
    const thisKind = hand.kind
    expect(thisKind).toEqual(expected)
})

test.each([
    [new Hand('32T3K'), new Hand('T55J5'), -1],
])(`compareHands(%s, %s)`, (hand1, hand2, expected) => {
    const thisComparison = sortHands(hand1, hand2)
    expect(thisComparison).toEqual(expected)
})