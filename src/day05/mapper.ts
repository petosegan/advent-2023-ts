import { RangeMap } from './rangemap.js'
import { mergeRanges, type Range } from './range.js'

export class Mapper {
  constructor (
    public source: string,
    public dest: string,
    public input_maps: RangeMap[]
  ) {}

  match (value: number): number {
    let result: number | null = null
    for (const inputMap of this.input_maps) {
      result = inputMap.match(value)
      if (result != null) {
        return result
      }
    }
    return value
  }

  transformRanges (ranges: Range[]): Range[] {
    let result: Range[] = []
    for (const range of ranges) {
      for (const inputMap of this.input_maps) {
        const tfmRanges = inputMap.transformRange(range)
        result = [...result, ...tfmRanges]
      }
    }
    return mergeRanges(result)
  }
}
