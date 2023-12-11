import { input } from "./input.env"

function solution(input: string): number {
  const matrix = input.split('\n').map(row => row.split(''))

  const expandedMatrix = expandMatrix(matrix)
  const galaxies: [i: number, j: number][] = []
  for (let row = 0; row < expandedMatrix.length; row++) {
    for (let column = 0; column < expandedMatrix[row].length; column++) {
      if (expandedMatrix[row][column] === '#') {
        galaxies.push([row, column])
      }
    }
  }

  const distances: number[] = []
  for (let i = 0; i < galaxies.length; i++) {
    const galaxy = galaxies[i]
    const [i1, j1] = galaxy
    for (let j = i + 1; j < galaxies.length; j++) {
      const otherGalaxy = galaxies[j]
      const [i2, j2] = otherGalaxy
      const distance = getDistance(galaxy, otherGalaxy)
      distances.push(distance)
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

function expandMatrix(matrix: string[][]): string[][] {
  const newMatrix = [...matrix].map(row => [...row])

  const emptyRows = newMatrix
    .map((_, index) => index)
    .filter(index => newMatrix[index]
      .every(cell => cell === '.'))

  const emptyColumns = newMatrix[0]
    .map((_, index) => index)
    .filter(index => column(newMatrix, index)
      .every(cell => cell === '.'))

  // Insert empty rows
  emptyRows.forEach((index, n) => {
    newMatrix.splice(index + n, 0, new Array(matrix[0].length).fill('.'))
  })

  // Insert empty columns
  emptyColumns.forEach((index, n) => {
    newMatrix.forEach(row => {
      row.splice(index + n, 0, '.')
    })
  })

  return newMatrix
}

function printMatrix(matrix: string[][]): void {
  matrix.forEach(row => {
    console.log(row.join(''))
  })
}

console.log(solution(input))