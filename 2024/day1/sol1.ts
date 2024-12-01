import * as fs from 'fs';
import * as path from 'path';

function parseInput(filePath: string): { left: number[]; right: number[] } {
    const input = fs.readFileSync(filePath, 'utf-8');
    const left: number[] = [];
    const right: number[] = [];

    input
        .trim()
        .split('\n')
        .forEach(line => {
            const [l, r] = line.trim().split(/\s+/).map(Number);
            left.push(l);
            right.push(r);
        });

    return { left, right };
}

export const parsedData = parseInput(path.resolve(__dirname, "input.txt"));

let { left, right } = parsedData

left = left.sort()
right = right.sort()

const ans = left.reduce<number>((ans, num, i) => ans += Math.abs(num - right[i]), 0)

console.log(ans) // 1223326
