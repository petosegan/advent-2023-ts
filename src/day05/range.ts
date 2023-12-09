
export type Range = [number, number];

export function extractRanges(input: string): Range[] {
    // Extract numbers using a regular expression and convert them to integers
    const numbers = input.match(/\d+/g)?.map(n => parseInt(n)) || [];

    // Use reduce to group numbers into pairs
    return numbers.reduce((acc: Range[], curr, index, array) => {
        if (index % 2 === 0) {
            // Only push a pair when at an even index
            const thisRange: Range = [curr, array[index + 1]];
            acc.push(thisRange);
        }
        return acc;
    }, []);
}

export function mergeRanges(ranges: Range[]): Range[] {
    // Merge an array of ranges into the smallest number of non overlapping ranges
    // Sort the ranges by the start value
    const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);
    // Initialize the merged ranges with the first range
    let mergedRanges = [sortedRanges[0]];
    // Iterate through the remaining ranges
    for (let i = 1; i < sortedRanges.length; i++) {
        const thisRange = sortedRanges[i];
        // Get the last merged range
        const lastRange = mergedRanges[mergedRanges.length - 1];
        // If this range overlaps with the last merged range, merge them
        if (thisRange[0] <= lastRange[1]) {
            lastRange[1] = Math.max(thisRange[1], lastRange[1]);
        }
        // Otherwise, add this range to the merged ranges
        else {
            mergedRanges.push(thisRange);
        }
    }
    return mergedRanges;
}

export function overlap(r1: Range, r2: Range): Range | null {
    // Return the range of values that overlap between two ranges
    // or null if they do not overlap
    const [r1_start, r1_end] = r1;
    const [r2_start, r2_end] = r2;
    const start = Math.max(r1_start, r2_start);
    const end = Math.min(r1_end, r2_end);
    if (start <= end) {
        return [start, end];
    }
    return null;
}

export function difference(r1: Range, r2: Range): Range[] {
    // Return the range of values in r1 that are not in r2
    const [r1_start, r1_end] = r1;
    const [r2_start, r2_end] = r2;
    const start = Math.max(r1_start, r2_start);
    const end = Math.min(r1_end, r2_end);
    if (start <= end) {
        return [[r1_start, start], [end, r1_end]];
    }
    return [r1];
}

export function minRanges(ranges: Range[]): number {
    // Return the minimum value in an array of ranges
    return Math.min(...ranges.map(r => r[0]));
}