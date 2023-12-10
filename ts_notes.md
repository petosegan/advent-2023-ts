# Things I'm learning about typescript along the way:

## package.json

- needs `build: tsc`
- you can't just run node, always need to build first
- hmm, unless you use `ts-node`

## Compiler options:

- `"target": "es2021"` matters to match docs. default is 2016, too old
- `"target": "es2022"` is better, allows top-level async
- Probably want to set the `"outDir": "./dist"`

## testing

- `jest` seems fine
- Things get screwy when I convert to ES modules.
  - It seems like the tests are unable to reference the compiled js modules.
  - need to set `moduleNameMapper` in `jest.config.js` so that imports can reference `.js` files without breaking the tests.
- It looks better to use `npm init jest@latest` to autogen the config file
  - eh, but that does not seem to work with TS
- OK, possibly what I want is [`ts-jest`](https://kulshekhar.github.io/ts-jest/docs/)
- Yeah. After a great deal of futzing around, I reach a combination that works.
  - In `package.json`
    - `"test": "node --experimental-vm-modules ./node_modules/.bin/jest"`
    - `"type": "module"`
  - In `jest.config.js`:
    - `preset: "ts-jest/presets/default-esm`
  - In `tsconfig.json`:
    - `"target": "esnext"`
    - `"module": "esnext"`
    - `"moduleResolution": "Node"`
- Also, it is important to avoid running tests against `dist`:
  - In `tsconfig.json`:
    - `"exclude": ["**/*.test.ts]`
  - In `jest.config.js`:
    - `testPathIgnorePatterns: ["/dist/"]`

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

## Linting and Formatting

I set up the Prettier ESLint extension. It explains what to put in the project `settings.json`.

```bash
npx eslint --init
```
