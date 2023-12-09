# Things I'm learning about typescript along the way:

## package.json

- needs `build: tsc`
- you can't just run node, always need to build first

## Compiler options:

- "target": "es2021" matters to match docs. default is 2016, too old
- Probably want to set the outDir

## testing

- `jest` seems fine
- `jest.config.js` is required for ts compatibility

## logging

- sucks
- I tried winston, pino, and bunyan, and they all give me trash out of the box.
- I think I'll just use console.log for now.

## browser display

- First, need to set up an api with express
- Then, need an index.html to set the canvas, and a script.js for interactivity
- I don't think I really understand why index.html is served? I guess it is probably an express app default?
- There was some annoyance about getting newlines to render. It worked when I created a `pre` area and set the innerHtml.
- I'm running the server using `ts-node` so that I don't have to compile the typescript.
- and I wrap it in `nodemon` to restart on file change
- There was some annoyance about getting the button to work. It was a scope problem.

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