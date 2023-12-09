// Determine which games would have been possible if the bag contained 12 red, 13 green, 14 blue
import * as fs from 'fs';
import {main, load} from './common';


type Coord = {
    x: number;
    y: number;
};

type HasCoord = {
    coord: Coord;
};

function areAdjacent(a: Coord, b: Coord): boolean {
    // Check if coordinates are horizontally, vertically, or diagonally adjacent
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);

    // Adjacent if the difference in either x or y is 1 and the other is 0,
    // or if both are 1 (diagonal adjacency)
    return (dx <= 1 && dy <= 1);
}

function areGearNumberAdjacent(g: HasCoord, n: Number): boolean {
    const isDigitAdjacent = n.coords.some(c => areAdjacent(c, g.coord));
    return isDigitAdjacent;
}


// a Number object carries a number and the coordinates
// covered by the number in the diagram
type Number = {
    value: number;
    coords: Coord[];
};

// A Symbol object carries a symbol and the coordinates
// of the symbol in the diagram
type Symbol = {
    value: string;
    coord: Coord;
};

// A Gearlike is a symbol with value '*'
type Gearlike = {
    coord: Coord;
}

// A Gear is a symbol that is adjacent
// to exactly two numbers
export class Gear implements HasCoord {
    coord: Coord;
    numbers: Number[];

    constructor(coord: Coord, numbers: Number[]) {
        this.coord = coord;
        this.numbers = numbers;
    }

    public gear_ratio(): number {
        return this.numbers[0].value * this.numbers[1].value;
    }
}

// A diagram is defined by the height, width,
// and the numbers and symbols
export class Diagram {
    height: number;
    width: number;
    numbers: Number[];
    symbols: Symbol[];
    gearlikes: Gearlike[];
    gears: Gear[]

    constructor(diagramLines: string[]) {
        this.height = diagramLines.length;
        this.width = diagramLines[0].length;
        this.numbers = [];
        this.symbols = [];
        this.gearlikes = [];
        this.parseDiagram(diagramLines);
        this.gears = this.findGears(this.gearlikes, this.numbers);
    }

    public findGears(gearlikes: Gearlike[], numbers: Number[]): Gear[] {
        let gears: Gear[] = [];
        for (const gearlike of gearlikes) {
            const these_neighbors = numbers.filter(n => areGearNumberAdjacent(gearlike, n));
            if (these_neighbors.length == 2) {
                gears.push(new Gear(gearlike.coord, these_neighbors));
            }
        }
        return gears;
    }

    public makeMask(points: HasCoord[]): number[][] {
        // Create a mask for coordinates
        // adjacent to the symbols
        let mask: number[][] = [];
        for (let y = 0; y < this.height; y++) {
            mask.push([]);
            for (let x = 0; x < this.width; x++) {
                mask[y].push(0);
            }
        }

        // Add the coordinates of the symbols and the
        // adjacent squares to the mask
        for (const symbol of points) {
            const left = Math.max(0, symbol.coord.x - 1);
            const right = Math.min(this.width, symbol.coord.x + 1);
            const top = Math.max(0, symbol.coord.y - 1);
            const bottom = Math.min(this.height, symbol.coord.y + 1);
            for (let y = top; y <= bottom; y++) {
                for (let x = left; x <= right; x++) {
                    mask[y][x] = 1;
                }
            }
        }

        return mask;
    }

    public makeMaskString(mask: number[][]): string {
        // Convert the mask to a string
        let maskString = "";
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (mask[y][x] === 0) {
                    maskString += ".";
                } else {
                    maskString += "#";
                }
            }
            maskString += "\n";
        }
        return maskString;
    }

    parseDiagram(diagramLines: string[]): void {
        // Parse the diagram
        for (let y = 0; y < this.height; y++) {
            const parsed = this.parseLine(diagramLines[y], y);
            this.numbers.push(...parsed.numbers);
            this.symbols.push(...parsed.symbols);
            this.gearlikes.push(...parsed.gearlikes);
        }
    }

    parseLine(diagramLine: string, y: number)  {
        // Use regex to find all the numbers with offsets
        const numberRegex = /(\d+)/g;
        let numbers: Number[] = [];
        let numberMatch;
        while ((numberMatch = numberRegex.exec(diagramLine)) != null) {
            const text = numberMatch[0];
            const start = numberMatch.index;

            const positions = Array.from({ length: text.length }, (_, i) => start + i);
            const coords = positions.map(pos => ({x: pos, y}));
            numbers.push({value: parseInt(text), coords: coords});
        }

        // Use regex to find all the symbols with offsets
        let symbols: Symbol[] = [];
        const symbolRegex = /[^\d.]/g;
        let symbolMatch;
        while ((symbolMatch = symbolRegex.exec(diagramLine)) != null) {
            const text = symbolMatch[0];
            const start = symbolMatch.index;

            symbols.push({value: text, coord: {x: start, y}});
        }

        // Use regex to find all the gearlikes with offsets
        let gearlikes: Gearlike[] = [];
        const gearlikeRegex = /\*/g;
        let gearlikeMatch;
        while ((gearlikeMatch = gearlikeRegex.exec(diagramLine)) != null) {
            const text = gearlikeMatch[0];
            const start = gearlikeMatch.index;

            gearlikes.push({coord: {x: start, y}});
        }
        return {numbers: numbers, symbols: symbols, gearlikes: gearlikes};
    }

    public findPartNumbers(): Number[] {
        // Find the numbers that are adjacent to a symbol,
        // using a mask
        const mask = this.makeMask(this.symbols);
        const part_numbers = this.numbers.filter(number => {
            for (const coord of number.coords) {
                if (mask[coord.y][coord.x] == 1) {
                    return true;
                }
            }
            return false;
        });
        return part_numbers;
    }
};

export function solve_a(lines: string[]): number {
    const diagram = new Diagram(lines);
    // console.log(diagram);
    const symbol_mask = diagram.makeMask(diagram.symbols);
    const part_numbers = diagram.findPartNumbers();
    const part_number_values = part_numbers.map(number => number.value);
    const sum = part_number_values.reduce((a, b) => a + b, 0);
    return sum;
}

export function solve_b(lines: string[]): number {
    const diagram = new Diagram(lines);
    // console.log(diagram);
    const gear_ratios = diagram.gears.map(gear => gear.gear_ratio());
    const sum = gear_ratios.reduce((a, b) => a + b, 0);
    return sum;
}

if (require.main == module) {
    main('data/input03.txt', [solve_a, solve_b]);
}

