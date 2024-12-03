import { extractNumbers, parser, regexPatterns } from "./sol1"

const input = parser("input.txt")

let ans = 0
let lastDoIndex = -1

for (let i = 0; i < input.length; i++) {
    if (input[i] === 'm') {
        let k = i + 4
        if (k <= input.length && input.slice(i, k) === "mul(") {
            let j = i + 1
            for (let l = 0; l < regexPatterns.length && j < input.length; l++, j++) {
                const pattern = regexPatterns[l]

                if (l === 4 || l === 6) {
                    while (true) {
                        if (j + 1 < input.length && pattern.test(input.slice(i, j + 1))) j++
                        else break
                    }
                }
                else if (l === 7 && pattern.test(input.slice(i, j)) && isValidSlice(i)) {
                    const [num1, num2] = extractNumbers(input.slice(i, j))
                    ans += num1 * num2
                    break
                }
                else if (!pattern.test(input.slice(i, j))) {
                    break
                }
            }
        }
    }
}


function isValidSlice(i: number) {
    const slice = lastDoIndex === -1 ? input.slice(0, i): input.slice(lastDoIndex, i)
    const doIndices = Array.from(slice.matchAll(/do()/g)).map(i => i.index);
    const dontIndices = Array.from(slice.matchAll(/don't()/g)).map(i => i.index);

    if(dontIndices.length === 0) return true
    else {
        lastDoIndex = Math.max(...doIndices)
        return lastDoIndex > Math.max(...dontIndices)
    }

}

console.log(ans)