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
    let rawRanges: Range[] = ranges
    let transformedRanges: Range[] = []
    for (const inputMap of this.input_maps) {
      const thisMapUntouched: Range[] = []
      const thisMapTransformed: Range[] = []
      for (const range of rawRanges) {
        const [thisRangeUntouched, thisRangeTransformed] = inputMap.transformRange(range)
        thisMapUntouched.push(...thisRangeUntouched)
        if (thisRangeTransformed!= null) {
          thisMapTransformed.push(thisRangeTransformed)
        }
      }
      rawRanges = thisMapUntouched
      transformedRanges = mergeRanges([...transformedRanges,...thisMapTransformed])
    }
    const totalUntouched: Range[] = mergeRanges(rawRanges)
    // untouched ranges map via the identity
    const totalTransformed: Range[] = mergeRanges([...transformedRanges,...totalUntouched])
    return totalTransformed
  }
}
