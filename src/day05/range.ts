export type Range = [number, number]

export function extractRanges (input: string): Range[] {
  // Extract numbers using a regular expression and convert them to integers
  const numbers = input.match(/\d+/g)?.map(n => parseInt(n))
  if (numbers === undefined) {
    throw new Error(`No numbers found in ${input}`)
  }

  // Use reduce to group numbers into pairs
  return numbers.reduce((acc: Range[], curr, index, array) => {
    if (index % 2 === 0) {
      // Only push a pair when at an even index
      const thisRange: Range = [curr, array[index + 1]]
      acc.push(thisRange)
    }
    return acc
  }, [])
}

export function mergeRanges (ranges: Range[]): Range[] {
  // Merge an array of ranges into the smallest number of non overlapping ranges
  // Sort the ranges by the start value
  const sortedRanges = ranges.sort((a, b) => a[0] - b[0])
  // Initialize the merged ranges with the first range
  const mergedRanges = [sortedRanges[0]]
  // Iterate through the remaining ranges
  for (let i = 1; i < sortedRanges.length; i++) {
    const thisRange = sortedRanges[i]
    // Get the last merged range
    const lastRange = mergedRanges[mergedRanges.length - 1]
    // If this range overlaps with the last merged range, merge them
    if (thisRange[0] <= lastRange[1]) {
      lastRange[1] = Math.max(thisRange[1], lastRange[1])
    } else {
      mergedRanges.push(thisRange)
    }
  }
  return mergedRanges
}

export function overlap (r1: Range, r2: Range): Range | null {
  // Return the range of values that overlap between two ranges
  // or null if they do not overlap
  const [r1Start, r1End] = r1
  const [r2Start, r2End] = r2
  const start = Math.max(r1Start, r2Start)
  const end = Math.min(r1End, r2End)
  if (start <= end) {
    return [start, end]
  }
  return null
}

export function difference (r1: Range, r2: Range): Range[] {
  // Return the range of values in r1 that are not in r2
  const [r1Start, r1End] = r1
  const [r2Start, r2End] = r2
  const start = Math.max(r1Start, r2Start)
  const end = Math.min(r1End, r2End)
  if (start <= end) {
    return [[r1Start, start], [end, r1End]]
  }
  return [r1]
}

export function minRanges (ranges: Range[]): number {
  // Return the minimum value in an array of ranges
  return Math.min(...ranges.map(r => r[0]))
}
