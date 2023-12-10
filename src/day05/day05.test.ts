import {Range, difference, overlap, mergeRanges} from './range'
import { RangeMap, TfmResult } from './rangemap'
import {Mapper} from './mapper'
// // import { test, expect } from '@jest/globals'

test('correctly map single inputs', () => {
  const inputMapA = new RangeMap(52, 50, 48)
  const thisMatchA = inputMapA.match(79)
  expect(thisMatchA).toEqual(81)
})

test.each(
  [
    [[1,10], [4,5], [[1,4], [5, 10]]],
    [[1,10], [14,15], [[1,10]]],
    [[1,10], [0,11], []],
    [[1,10], [-10,-9], [[1,10]]],
    [[1,10], [8,14], [[1,8]]],
    [[1,10], [-4, 5], [[5,10]]]
  ]
)('difference %p and %p', (r1: number[], r2: number[], expected: number[][]) => {
  const thisDifference = difference(r1 as Range, r2 as Range)
  expect(thisDifference).toEqual(expected as Range[])
})

test.each(
  [
    [[1,10], [4,5], [4, 5]],
    [[1,10], [14,15], null],
    [[1,10], [0,11], [1, 10]],
    [[1,10], [-10,-9], null],
    [[1,10], [8,14], [8, 10]],
    [[1,10], [-4, 5], [1, 5]]
  ]
)('overlap %p and %p', (r1: number[], r2: number[], expected: number[] | null) => {
  const thisOverlap = overlap(r1 as Range, r2 as Range)
  expect(thisOverlap).toEqual(expected as Range | null)
})


test.each([
  [[79, 93] as Range, [52, 50, 48], [[], [81, 95]] as TfmResult],
  [[55, 68] as Range, [52, 60, 48], [[[55, 60]], [52, 60]] as TfmResult],
  [[55, 68] as Range, [52, 50, 48], [[], [57, 70]] as TfmResult],
]
)('transform %p with %p', (inputRange: Range, rangeMapArgs: number[], expectedRanges: [Range[], Range | null]) => {
  const [dest_start, source_start, range_length] = rangeMapArgs
  const rangeMap: RangeMap = new RangeMap(dest_start, source_start, range_length)
  const thisTransform = rangeMap.transformRange(inputRange as Range)
  expect(thisTransform).toEqual(expectedRanges as [Range[], Range])
})

test.each([
  [[[52, 60], [55, 60]], [[52, 60]]]
])('merge', (inputRanges: number[][], expectedRanges: number[][]) => {
  const thisMerge = mergeRanges(inputRanges as Range[])
  expect(thisMerge).toEqual(expectedRanges as Range[])
})

test('mapper', () => {
  const thisMapper = new Mapper('a', 'b', [
    new RangeMap(52, 50, 48),
    new RangeMap(50, 98, 2)
  ])
  const thisInput: Range[] = [[79, 93], [55, 68]]
  const thisOutput = thisMapper.transformRanges(thisInput)
  console.log(thisOutput)
  expect(thisOutput).toEqual([[57, 70], [81, 95]] as Range[])
})