import { input } from "./input.env"

function solution(input: string): number {
  const matrix = input.split('\n').map(row => row.split(''))

  const emptyRows = matrix
    .map((_, index) => index)
    .filter(index => matrix[index]
      .every(cell => cell === '.'))

  const emptyColumns = matrix[0]
    .map((_, index) => index)
    .filter(index => column(matrix, index)
      .every(cell => cell === '.'))

  const emptyRowsBetween = (i1: number, i2: number) => emptyRows.filter(row => {
    const max = Math.max(i1, i2)
    const min = Math.min(i1, i2)
    return row > min && row < max
  }).length
  const emptyColumnsBetween = (j1: number, j2: number) => emptyColumns.filter(column => {
    const max = Math.max(j1, j2)
    const min = Math.min(j1, j2)
    return column > min && column < max
  }).length

  const galaxies: [i: number, j: number][] = []
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      if (matrix[row][column] === '#') {
        galaxies.push([row, column])
      }
    }
  }

  const distanceFactor = 999999
  const distances: number[] = []
  for (let i = 0; i < galaxies.length; i++) {
    const galaxy = galaxies[i]
    const [i1, j1] = galaxy
    for (let j = i + 1; j < galaxies.length; j++) {
      const otherGalaxy = galaxies[j]
      const [i2, j2] = otherGalaxy
      // D = d + F * (voidRows + voidColumns)
      const distance = getDistance(galaxy, otherGalaxy)
      const voidRows = emptyRowsBetween(i1, i2)
      const voidColumns = emptyColumnsBetween(j1, j2)
      const newDistance = distance + distanceFactor * (voidRows + voidColumns)
      distances.push(newDistance)
    }
  }

  return distances.reduce((sum, curr) => sum + curr, 0)
}

function getDistance(point1: [number, number], point2: [number, number]): number {
  const [i1, j1] = point1
  const [i2, j2] = point2
  const iDistance = Math.abs(i1 - i2)
  const jDistance = Math.abs(j1 - j2)

  return iDistance + jDistance

}

function column(matrix: string[][], col: number): string[] {
  var column = [];
  for (var i = 0; i < matrix.length; i++) {
    column.push(matrix[i][col]);
  }
  return column;
}

console.log(solution(input))