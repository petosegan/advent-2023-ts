import { main } from '../common'
import { extractRanges, type Range, minRanges } from './range'
import { RangeMap } from './rangemap'
import { Mapper } from './mapper'
export { RangeMap }

function parseSeedRanges (seedString: string): Range[] {
  // Parse the seed string into a list of seed ranges
  const [, seedList] = seedString.split(':')
  return extractRanges(seedList)
}

function parseSeeds (seedString: string): number[] {
  // Parse the seed string into a list of numbers
  const [, seedList] = seedString.split(':')
  const seedMatches = seedList.match(/\d+/g)
  const seeds = seedMatches?.map((sm) => parseInt(sm, 10))
  if (seeds === undefined) {
    throw new Error('Invalid seed list')
  }
  return seeds
}

function parseRangeMaps (mappingLines: string): RangeMap[] {
  // Parse the mapping lines into a list of RangeMaps
  const inputMaps: RangeMap[] = []
  const inputMapLines = mappingLines.split('\n')
  for (const inputMapLine of inputMapLines) {
    const [destStart, sourceStart, rangeLength] = inputMapLine.split(' ')
    const inputMap = new RangeMap(
      parseInt(sourceStart, 10),
      parseInt(destStart, 10),
      parseInt(rangeLength, 10)
    )
    inputMaps.push(inputMap)
  }
  return inputMaps
}

function parseMapper (section: string): Mapper {
  // Parse a mapper from a section of the input file
  const [labelLines, mappingLines] = section.split(':')
  const mappingName = labelLines.split(' ')[0]
  const [source, dest] = mappingName.split('-to-')
  const inputMaps = parseRangeMaps(mappingLines)
  return new Mapper(source, dest, inputMaps)
}

function parseMappers (lines: string[]): Mapper[] {
  // Parse a list of mappers from the input file
  const fileText = lines.join('\n')
  const fileSections = fileText.split('\n\n')
  const maps = fileSections.map((fs) => parseMapper(fs))
  return maps
}

const MAP_NAMES = [
  'seed',
  'soil',
  'fertilizer',
  'water',
  'light',
  'temperature',
  'humidity'
]

class GardenSpecA {
  seeds: number[]
  mappers: Mapper[]

  constructor (lines: string[]) {
    this.seeds = parseSeeds(lines[0])
    this.mappers = parseMappers(lines.slice(2))
  }
}

export function solveA (lines: string[]): number {
  const gardenSpec = new GardenSpecA(lines)
  const seeds: number[] = gardenSpec.seeds
  console.log(seeds)
  const maps: Mapper[] = gardenSpec.mappers

  const sourceToMap = new Map<string, Mapper>()
  for (const map of maps) {
    sourceToMap.set(map.source, map)
  }

  let values = seeds

  for (const mapName of MAP_NAMES) {
    if (!sourceToMap.has(mapName)) {
      throw new Error(`Missing map ${mapName}`)
    }
    const thisMap = sourceToMap.get(mapName)
    if (thisMap === undefined) {
      throw new Error(`Missing map ${mapName}`)
    }
    const thisDest = thisMap.dest
    values = values.map((value) => thisMap.match(value))
    console.log(`${thisDest}: `, values)
    // print the min value
    console.log(`min ${thisDest}: `, Math.min(...values))
  }
  return Math.min(...values)
}

class GardenSpecB {
  seedRanges: Range[]
  mappers: Mapper[]

  constructor (lines: string[]) {
    this.seedRanges = parseSeedRanges(lines[0])
    this.mappers = parseMappers(lines.slice(2))
  }
}

export function solveB (lines: string[]): number {
  console.log('\nSOLVER B')
  const gardenSpec = new GardenSpecB(lines)
  const seedRanges: Range[] = gardenSpec.seedRanges
  console.log('seedRanges: ', seedRanges)
  const maps: Mapper[] = gardenSpec.mappers

  const sourceToMap = new Map<string, Mapper>()
  for (const map of maps) {
    sourceToMap.set(map.source, map)
  }

  let values: Range[] = seedRanges
  let minValue = seedRanges[0][0]

  for (const mapName of MAP_NAMES) {
    if (!sourceToMap.has(mapName)) {
      throw new Error(`Missing map ${mapName}`)
    }
    const thisMap = sourceToMap.get(mapName)
    if (thisMap === undefined) {
      throw new Error(`Missing map ${mapName}`)
    }
    const thisDest = thisMap?.dest
    values = thisMap.transformRanges(values)

    // console.log(`${thisDest}: `, values);
    // print the min value
    minValue = minRanges(values)
    console.log(`min ${thisDest}: `, minValue)
  }
  return minValue
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main('data/input05_sample.txt', [solveA, solveB])
}
