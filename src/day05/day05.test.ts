import { RangeMap } from './rangemap'
import { test, expect } from '@jest/globals'

test('correctly map inputs', () => {
  const inputMap = new RangeMap(50, 52, 48)
  const thisMatch = inputMap.match(79)
  expect(thisMatch).toEqual(81)
})
