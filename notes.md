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

