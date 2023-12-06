import * as fs from 'fs';

export function calibrate(line: string): number {
    const chars = line.split('');
    const number_chars: string[] = chars.filter(char => char >= '0' && char <= '9');
    const first_and_last = number_chars[0] + number_chars[number_chars.length - 1];
    const number = parseInt(first_and_last);
    return number;
}

export function solve(lines: string[]): number {
    // for each line, get the calibration value
    const calibrations = lines.map(line => calibrate(line));
    console.log(calibrations);
    // then sum them all up
    const sum = calibrations.reduce((a, b) => a + b, 0);
    console.log(sum);
    return sum;
}

async function main(): Promise<number> {
    const data = fs.readFileSync('data/input01.txt');
    const text = data.toString();
    const lines = text.trim().split('\n');
    console.log(lines);
    const result = solve(lines);
    return result
}

if (require.main == module) {
    main();
}
