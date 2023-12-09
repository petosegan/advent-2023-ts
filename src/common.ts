import * as fs from 'fs';

export async function load(filename: string): Promise<string[]> {
    const data = fs.readFileSync(filename);
    const text = data.toString();
    const lines = text.trim().split('\n');
    return lines;
}

export type SolverFunc = (input: string[]) => number;

export async function main(filename: string, solvers: SolverFunc[]) {
    const lines = await load(filename);
    for (const solver of solvers) {
        const result = solver(lines);
        console.log(result);
    }
}

