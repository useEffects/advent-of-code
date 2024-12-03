import { readFileSync } from "fs"
import * as path from "path"

export const parser = (filename: string): string => {
    return readFileSync(path.join(__dirname, filename), "utf8").trim().split("\n").join('')
}

const input = parser("input.txt")

const regexPatterns = [
    /^m$/,                    // Matches 'm'
    /^mu$/,                   // Matches 'mu'
    /^mul$/,                  // Matches 'mul'
    /^mul\($/,                // Matches 'mul('
    /^mul\(\d{1,3}$/,         // Matches 'mul(' followed by 1-3 digits
    /^mul\(\d{1,3},$/,        // Matches 'mul(123,'
    /^mul\(\d{1,3},\d{1,3}$/, // Matches 'mul(123,456'
    /^mul\(\d{1,3},\d{1,3}\)$/ // Matches 'mul(123,456)'
];

let ans = 0

for (let i = 0; i < input.length; i++) {
    if (input[i] === 'm') {
        let k = i + 4
        if (k <= input.length && input.slice(i, k) === "mul(") {
            let j = i + 1
            for (let l = 0; l < regexPatterns.length && j < input.length; l++) {
                const pattern = regexPatterns[l]

                if (l === 4 || l === 6) {
                    while (true) {
                        if (j + 1 < input.length && pattern.test(input.slice(i, j + 1))) j++
                        else break
                    }
                }
                else if (l === 7 && pattern.test(input.slice(i, j))) {
                    const [num1, num2] = extractNumbers(input.slice(i, j))
                    ans += num1 * num2
                    break
                }
                else if (!pattern.test(input.slice(i, j))) {
                    break
                }
                j++
            }
        }
    }
}

console.log(ans)

function extractNumbers(input: string): [number, number] {
    const match = input.match(/mul\((\d+),(\d+)\)/)!;
    const [, num1, num2] = match;
    return [parseInt(num1, 10), parseInt(num2, 10)];
}
