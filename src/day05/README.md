## Day 05 B

Interesting problem. I need to transform ranges using linear maps.
So for example I have the range (79, 93)
and the maps: (50, 98, 2), (52, 50, 48), expressed as (dest_start, source_start, length).

I can transform this by:

1. Finding which maps overlap the range
2. Transform the overlaps and pass the non-overlaps
3. Merge the results

So in this case:

1. (52, 50, 48) overlaps the range: it covers (50, 98) and the overlap is (79, 93)
2. The transformation gives (81, 95), no non-overlaps
3. No merge step

How about (55, 68)? Let's imagine the map is (52, 60, 48)

1. Overlap is (60, 68), non overlap is (55, 60)
2. Transform to (52, 60), (55, 60)
3. Merge to (52, 60)
