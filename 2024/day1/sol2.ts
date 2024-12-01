import { parsedData } from "./sol1"

const rightDict: Record<number, number> = {}

const { left, right } = parsedData

right.forEach(num => num in rightDict ? rightDict[num]++ : rightDict[num] = 1)

const ans = left.reduce<number>((ans, num) => num in rightDict ? ans += (num * rightDict[num]) : ans, 0)

console.log(ans) // 21070419


