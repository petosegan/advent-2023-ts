import {Diagram, solve_b} from './day03';
import {test, expect} from '@jest/globals';

test("correctly parses lines", () => {
  const diagram = new Diagram(['aa','bb']);
  expect(diagram.parseLine("123", 1)).toEqual({
    numbers: [{value: 123, coords:[{x:0,y:1}, {x:1,y:1}, {x:2,y:1}]}],
    symbols:[],
    gearlikes:[],
  }
  );
  expect(diagram.parseLine("12*3", 1)).toEqual({
    numbers: [{value: 12, coords:[{x:0,y:1}, {x:1,y:1}, ]}, {value: 3, coords:[{x:3,y:1}]}],
    symbols:[{value: "*", coord:{x:2,y:1}}],
    gearlikes:[{coord:{x:2,y:1}}],
  }
  );
  expect(diagram.parseLine(".1.1.1", 1)).toEqual({
    numbers: [{value: 1, coords: [{x: 1, y:1}]},
    {value: 1, coords: [{x: 3, y: 1}]},
    {value: 1, coords: [{x: 5, y: 1}]}],
    symbols: [],
    gearlikes:[],
  }
  );
  expect(diagram.parseLine("12/3", 1)).toEqual({
    numbers: [{value: 12, coords:[{x:0,y:1}, {x:1,y:1}, ]}, {value: 3, coords:[{x:3,y:1}]}],
    symbols:[{value: "/", coord:{x:2,y:1}}],
    gearlikes:[],
  }
  );
});

const test_diagram_b = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.trim().split('\n');

test('finds gears for sample for part b', () => {
  const diagram = new Diagram(test_diagram_b);
  expect(diagram.gearlikes.length).toBe(3);
  expect(diagram.numbers.length).toBe(10);
  expect(diagram.gears.length).toBe(2);

  const gearlike_coords = diagram.gearlikes.map(g => g.coord);
  expect(gearlike_coords.length).toBe(3);
  const gear_coords = diagram.gears.map(g => g.coord);
  expect(gear_coords.length).toBe(2);
  // expect(gear_coords).toStrictEqual([
  //   {x: 3, y: 1},
  //   {x: 5, y: 8}
  // ])
});

test('solves sample for part b', () => {
  expect(solve_b(test_diagram_b)).toBe(467835);
})