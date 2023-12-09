import {main} from '../common';
import {extractRanges, Range, minRanges} from './range';
import {RangeMap} from './rangemap';
import {Mapper} from './mapper'

function parseSeedRanges(seedString: string): Range[] {
    // Parse the seed string into a list of seed ranges
    const [_, seed_list] = seedString.split(':');
    return extractRanges(seed_list);
}

function parseSeeds(seedString: string): number[] {
    // Parse the seed string into a list of numbers
    const [_, seed_list] = seedString.split(':');
    const seedMatches = seed_list.match(/\d+/g);
    const seeds = seedMatches?.map(sm => parseInt(sm, 10))
    if (seeds === undefined) {
        throw new Error('Invalid seed list'); 
    }
    return seeds;
}

function parseRangeMaps(mapping_lines: string): RangeMap[] {
    // Parse the mapping lines into a list of RangeMaps
    const input_maps: RangeMap[] = [];
    const input_map_lines = mapping_lines.split('\n');
    for (const input_map_line of input_map_lines) {
        const [dest_start, source_start, range_length] = input_map_line.split(' ');
        const input_map = new RangeMap(
            parseInt(source_start, 10),
            parseInt(dest_start, 10),
            parseInt(range_length, 10)
        );
        input_maps.push(input_map);
    }
    return input_maps;
}

function parseMapper(section: string): Mapper {
    // Parse a mapper from a section of the input file
    const [label_lines, mapping_lines] = section.split(':');
    const [mapping_name, _] = label_lines.split(' ');
    const [source, dest] = mapping_name.split('-to-');
    const input_maps = parseRangeMaps(mapping_lines);
    return new Mapper(source, dest, input_maps);
}

function parseMappers(lines: string[]): Mapper[] {
    // Parse a list of mappers from the input file
    const fileText = lines.join('\n');
    const fileSections = fileText.split('\n\n');
    const maps = fileSections.map(fs => parseMapper(fs));
    return maps;
}


const MAP_NAMES = [
    'seed',
    'soil',
    'fertilizer',
    'water',
    'light',
    'temperature',
    'humidity',
]

class GardenSpecA {
    seeds: number[];
    mappers: Mapper[];

    constructor(lines: string[]) {
        this.seeds = parseSeeds(lines[0]);
        this.mappers = parseMappers(lines.slice(2));
    }
}

export function solve_a(lines: string[]): number {
    const gardenSpec = new GardenSpecA(lines);
    const seeds: number[] = gardenSpec.seeds;
    console.log(seeds)
    const maps: Mapper[] = gardenSpec.mappers;

    let sourceToMap = new Map<string, Mapper>();
    for (const map of maps) {
        sourceToMap.set(map.source, map);
    }

    let values = seeds;

    for (const mapName of MAP_NAMES) {
        if (!sourceToMap.has(mapName)) {
            throw new Error(`Missing map ${mapName}`);
        }
        const thisMap = sourceToMap.get(mapName);
        const thisDest = thisMap?.dest;
        values = values.map(value => thisMap?.match(value) || value);
        console.log(`${thisDest}: `, values);
        // print the min value
        console.log(`min ${thisDest}: `, Math.min(...values));
    }
    return Math.min(...values);
}

class GardenSpecB {
    seedRanges: Range[];
    mappers: Mapper[];

    constructor(lines: string[]) {
        this.seedRanges = parseSeedRanges(lines[0]);
        this.mappers = parseMappers(lines.slice(2));
    }
}

export function solve_b(lines: string[]): number {
    console.log('\nSOLVER B')
    const gardenSpec = new GardenSpecB(lines);
    const seedRanges: Range[] = gardenSpec.seedRanges;
    console.log('seedRanges: ', seedRanges)
    const maps: Mapper[] = gardenSpec.mappers;

    let sourceToMap = new Map<string, Mapper>();
    for (const map of maps) {
        sourceToMap.set(map.source, map);
    }

    let values: Range[] = seedRanges;
    let minValue = seedRanges[0][0];

    for (const mapName of MAP_NAMES) {
        if (!sourceToMap.has(mapName)) {
            throw new Error(`Missing map ${mapName}`);
        }
        const thisMap = sourceToMap.get(mapName);
        if (thisMap === undefined) {
            throw new Error(`Missing map ${mapName}`);
        }
        const thisDest = thisMap?.dest;
        values = thisMap.transformRanges(values);

        // console.log(`${thisDest}: `, values);
        // print the min value
        minValue = minRanges(values);
        console.log(`min ${thisDest}: `, minValue);
    }
    return minValue;
}

if (require.main == module) {
    main('data/input05_sample.txt', [solve_a, solve_b]);
}