import { main } from '../common.js'

class Race {
    constructor (
        public time: number,
        public distance: number
    ) {}

    get nWins (): number {
        // create an array length this.time
        const times: number[] = Array.from({length: this.time}, (_, i) => i + 1)
        const distances: number[] = times.map(time => time * (this.time - time))
        const raceWins: number[] = distances.filter(distance => distance > this.distance)
        return raceWins.length
    }
}

function parseRaces (timeString: string, distanceString: string): Race[] {
    // Parse the time and distance strings into a list of races
    const timeMatches = timeString.match(/\d+/g)
    const distanceMatches = distanceString.match(/\d+/g)
    const races: Race[] = []
    if (timeMatches === null || distanceMatches === null) {
        throw new Error('Invalid race list')
    }
    for (let i = 0; i < timeMatches.length; i++) {
        const time = parseInt(timeMatches[i], 10)
        const distance = parseInt(distanceMatches[i], 10)
        races.push(new Race(time, distance))
    }
    return races
}

function solveA(input: string[]): number {
    const races: Race[] = parseRaces(input[0], input[1])
    const raceNWins = races.map(race => race.nWins)
    return raceNWins.reduce((a, b) => a * b, 1)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main('data/input06_b.txt', [solveA])
}