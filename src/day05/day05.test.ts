import { RangeMap } from './day05'
// // import { test, expect } from '@jest/globals'

test('correctly map inputs', () => {
  const inputMap = new RangeMap(50, 52, 48)
  const thisMatch = inputMap.match(79)
  expect(thisMatch).toEqual(81)
})

test('trivial test', () => {
  expect(true).toBe(true)
})