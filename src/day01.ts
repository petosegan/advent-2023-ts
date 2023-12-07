import {main} from './common';

export function calibrate(line: string): number {
    const chars = line.split('');
    const number_chars: string[] = chars.filter(char => char >= '0' && char <= '9');
    const first_and_last = number_chars[0] + number_chars[number_chars.length - 1];
    const number = parseInt(first_and_last);
    return number;
}

export function solve_a(lines: string[]): number {
    // for each line, get the calibration value
    const calibrations = lines.map(line => calibrate(line));
    console.log(calibrations);
    // then sum them all up
    const sum = calibrations.reduce((a, b) => a + b, 0);
    console.log(sum);
    return sum;
}

const NUMBER_WORDS_MAP = {
    'one': 'o1e',
    'two': 't2o',
    'three': 't3e',
    'four': 'f4r',
    'five': 'f5e',
    'six': 's6x',
    'seven': 's7n',
    'eight': 'e8t',
    'nine': 'n9e',
}

export function transform(line: string): string {
    // Transform number words like 'one' in to numbers like 'o1e'
    let line_copy = line;
    for (const [number_word, number_word_transform] of Object.entries(NUMBER_WORDS_MAP)) {
        line_copy = line_copy.replaceAll(number_word, number_word_transform);
    }
    return line_copy;
}

export function solve_b(lines: string[]): number {
    // for each line, transform number words into numbers
    const transformed = lines.map(line => transform(line));
    console.log('transformed:', transformed);
    // then calibrate
    const calibrations = transformed.map(line => calibrate(line));
    console.log('calibrations: ', calibrations);
    // then sum them all up
    const sum = calibrations.reduce((a, b) => a + b, 0);
    console.log('b_sum: ', sum);
    return sum;
}

if (require.main == module) {
    main('data/input01.txt', [solve_a, solve_b]);
}
