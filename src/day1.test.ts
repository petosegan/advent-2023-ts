import { solve, calibrate } from './day1';
import { test, expect } from '@jest/globals';

test('solves correctly on test text', () => {
    const test_text = `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`.trim().split('\n');
    console.log(test_text);
    expect(solve(test_text)).toBe(142);
})

test('calibrates correctly on test lines', () => {
    expect(calibrate('1234')).toBe(14);
    expect(calibrate('1abc2')).toBe(12);
    expect(calibrate('pqr3stu8vwx')).toBe(38);
    expect(calibrate('a1b2c3d4e5f')).toBe(15);
    expect(calibrate('treb7uchet')).toBe(77);
})