import {RangeMap} from './rangemap';
import {test, expect} from '@jest/globals';

test('correctly map inputs', () => {
    const input_map = new RangeMap(50, 52, 48);
    const thisMatch = input_map.match(79);
    expect(thisMatch).toEqual(81);
})