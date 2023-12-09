import {RangeMap} from './rangemap'
import {mergeRanges, Range} from './range'

export class Mapper {
    constructor(
        public source: string,
        public dest: string,
        public input_maps: RangeMap[],
    ) {}

    match(value: number): number {
        let result: number | null = null;
        for (const input_map of this.input_maps) {
            result = input_map.match(value);
            if (result != null) {
                return result;
            }
        }
        return value;
    }

    transformRanges(ranges: Range[]): Range[] {
        let result: Range[] = [];
        for (const range of ranges) {
            for (const input_map of this.input_maps) {
                const tfmRanges = input_map.transformRange(range);
                result = [...result, ...tfmRanges];
        }}
        return mergeRanges(result);
    }
}