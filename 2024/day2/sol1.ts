import * as fs from 'fs';
import * as path from 'path';

export const parser = (fileName: string): number[][] => {
    const filePath = path.resolve(__dirname, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent
      .trim() // Remove any trailing newline or spaces
      .split('\n') // Split by lines
      .map(line => 
        line
          .trim() // Remove leading/trailing spaces for each line
          .split(/\s+/) // Split by one or more spaces
          .map(Number) // Convert each value to a number
      );
};

const reports = parser("input.txt");

const ans = reports.reduce<number>((ans, report) => {
    if(report.length <= 1) return ans
    else {
        let decreasing = false;
        for(let i = 0, j = 1; j < report.length; i++, j++) {
            if(j === 1 && report[i] > report[j]) decreasing = true
            if(decreasing ? (report[i] - report[j] >= 1 && report[i] - report[j] <= 3)
                : (report[j] - report[i] >= 1 && report[j] - report[i] <= 3)) {
                continue
            } else {
                return ans
            }
        }
        return ans += 1
    }
}, 0)

// console.log(ans)
