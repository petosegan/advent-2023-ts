import { main } from '../common'

export function calibrate (line: string): number {
  const chars = line.split('')
  const numberChars: string[] = chars.filter(
    (char) => char >= '0' && char <= '9'
  )
  const firstAndLast = numberChars[0] + numberChars[numberChars.length - 1]
  const number = parseInt(firstAndLast)
  return number
}

export function solveA (lines: string[]): number {
  // for each line, get the calibration value
  const calibrations = lines.map((line) => calibrate(line))
  // console.log(calibrations);
  // then sum them all up
  const sum = calibrations.reduce((a, b) => a + b, 0)
  // console.log(sum);
  return sum
}

const NUMBER_WORDS_MAP = {
  one: 'o1e',
  two: 't2o',
  three: 't3e',
  four: 'f4r',
  five: 'f5e',
  six: 's6x',
  seven: 's7n',
  eight: 'e8t',
  nine: 'n9e'
}

export function transform (line: string): string {
  // Transform number words like 'one' in to numbers like 'o1e'
  let lineCopy = line
  for (const [numberWord, numberWordTransform] of Object.entries(
    NUMBER_WORDS_MAP
  )) {
    lineCopy = lineCopy.replaceAll(numberWord, numberWordTransform)
  }
  return lineCopy
}

export function solveB (lines: string[]): number {
  // for each line, transform number words into numbers
  const transformed = lines.map((line) => transform(line))
  // console.log('transformed:', transformed);
  // then calibrate
  const calibrations = transformed.map((line) => calibrate(line))
  // console.log('calibrations: ', calibrations);
  // then sum them all up
  const sum = calibrations.reduce((a, b) => a + b, 0)
  // console.log('b_sum: ', sum);
  return sum
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main('data/input01.txt', [solveA, solveB])
}
