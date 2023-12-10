import { type Range, overlap, difference, mergeRanges } from './range.js'
import util from 'util'

type TfmResult = [Range[], Range | null]

class RangeMap {
  constructor (
    public dest_start: number,
    public source_start: number,
    public range_length: number
  ) {}

  toString (): string {
    return `${this.dest_start} ${this.source_start} ${this.range_length}`
  }

  [util.inspect.custom] (depth: number, options: any): string {
    return this.toString()
  }

  match (value: number): number | null {
    // Transform a single value from the source to the destination
    if (
      value >= this.source_start &&
      value < this.source_start + this.range_length
    ) {
      return this.dest_start + (value - this.source_start)
    }
    return null
  }


  transformRange (range: Range): TfmResult {
    // Transform a range of values from the source to the destination
    // returning the untouched parts and the transformed part
    const sourceRange: Range = [
      this.source_start,
      this.source_start + this.range_length
    ]
    const overlapRange = overlap(sourceRange, range)
    if (overlapRange === null) {
      return [[range], null]
    }
    const tfmOverlapRange: Range = [
      this.dest_start + (overlapRange[0] - this.source_start),
      this.dest_start + (overlapRange[1] - this.source_start)
    ]
    const differenceRanges = difference(range, sourceRange)
    return [differenceRanges, tfmOverlapRange]
  }
}

export {RangeMap, TfmResult}