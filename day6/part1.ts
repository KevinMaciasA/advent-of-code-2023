import { input } from "./input.env"

function solution(input: string): number {
  const [timeData, distanceData] = input.split('\n')
  const [_time, ...timeValues] = timeData.split(/\s+/)
  const [_distance, ...distanceValues] = distanceData.split(/\s+/)

  const equation = (totalTime: number, recordDistance: number) => {
    // x = time, T= total time, D = record distance
    // x(T-x) > D
    // x^2 - Tx + D < 0
    // x = (T +- sqrt(T^2 - 4D))/2

    const a = 1
    const b = -totalTime
    const c = recordDistance
    const discriminant = Math.sqrt(b * b - 4 * a * c)
    const x1 = (-b + discriminant) / (2 * a)
    const x2 = (-b - discriminant) / (2 * a)

    // `x < ${x1} or x > ${x2}`;
    const maxTime = Math.floor(x1) === x1 ? x1 - 1 : Math.floor(x1)
    const minTime = Math.ceil(x2) === x2 ? x2 + 1 : Math.ceil(x2)
    return [minTime, maxTime]
  }

  const solutions = timeValues.map((time, index) => {
    const distance = distanceValues[index]
    return equation(parseInt(time), parseInt(distance))
  })

  const numberOfSolutions = solutions.map((solution) => {
    const [x1, x2] = solution
    const diff = Math.abs(x1 - x2)
    return diff + 1
  })

  return numberOfSolutions.reduce((acc, curr) => acc * curr)
}

console.log(solution(input))