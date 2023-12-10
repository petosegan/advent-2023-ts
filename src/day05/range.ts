// Ranges are understood to be [a, b)
type Range = [number, number]

function extractRanges (input: string): Range[] {
  // Extract numbers using a regular expression and convert them to integers
  const numbers = input.match(/\d+/g)?.map(n => parseInt(n))
  if (numbers === undefined) {
    throw new Error(`No numbers found in ${input}`)
  }

  // Use reduce to group numbers into pairs
  return numbers.reduce((acc: Range[], curr, index, array) => {
    if (index % 2 === 0) {
      // Only push a pair when at an even index
      const thisRange: Range = [curr, curr + array[index + 1]]
      acc.push(thisRange)
    }
    return acc
  }, [])
}

function mergeRanges(ranges: Range[]) {
  if (ranges.length === 0) return [];

  // Sort the ranges by the start value
  const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);

  const mergedRanges = [];
  let currentRange = sortedRanges[0];

  for (let i = 1; i < sortedRanges.length; i++) {
    const thisRange = sortedRanges[i];
    if (currentRange[1] >= thisRange[0]) {
      // Extend the currentRange if there is an overlap
      currentRange[1] = Math.max(currentRange[1], thisRange[1]);
    } else {
      // Push the current range to mergedRanges and update currentRange
      mergedRanges.push(currentRange);
      currentRange = thisRange;
    }
  }

  // Push the last currentRange
  mergedRanges.push(currentRange);

  return mergedRanges as Range[];
}



function overlap (r1: Range, r2: Range): Range | null{
  // Return the range of values that overlap between two ranges
  // or the empty array if they do not overlap
  const [r1Start, r1End] = r1
  const [r2Start, r2End] = r2
  const start = Math.max(r1Start, r2Start)
  const end = Math.min(r1End, r2End)
  if (start <= end) {
    return [start, end]
  }
  return null
}

function difference (r1: Range, r2: Range): Range[] {
  // Return the ranges of values in r1 that are not in r2
  // or an empty array if r1 - r2 = empty set
  const [r1Start, r1End] = r1
  const [r2Start, r2End] = r2
  const ranges: Range[] = []
  if (r1Start < r2Start) {
    ranges.push([r1Start, Math.min(r1End, r2Start)])
  }
  if (r1End > r2End) {
    ranges.push([Math.max(r1Start, r2End), r1End])
  }
  return ranges
}

function minRanges (ranges: Range[]): number {
  // Return the minimum value in an array of ranges
  return Math.min(...ranges.map(r => r[0]))
}

export { Range, overlap, difference, minRanges, extractRanges, mergeRanges}