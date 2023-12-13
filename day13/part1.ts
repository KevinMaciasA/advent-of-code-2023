import { input } from "./input.env"

function solution(input: string): number {
  const matrixArray = input.split('\n\n')

  const result: number[] = []
  for (const array of matrixArray) {
    const matrix = array.split('\n').map(row => row.split(''))

    const nearCols = find2NearCols(matrix)
    const nearRows = find2NearRows(matrix)

    const maybeMirrors: { target: number, length: number }[] = []
    for (const col of nearCols) {
      const { isMirror, length } = isMirrorInY(matrix, col)
      if (!isMirror) continue

      maybeMirrors.push({ target: col, length })
    }

    for (const row of nearRows) {
      const { isMirror, length } = isMirrorInX(matrix, row)
      if (!isMirror) continue

      maybeMirrors.push({ target: row * 100, length })
    }

    if (maybeMirrors.length === 0) continue

    const mirror = maybeMirrors.sort((a, b) => a.length - b.length)[0]
    result.push(mirror.target)
  }

  return result.reduce((sum, current) => sum + current, 0)
}

function isMirrorInY(matrix: string[][], start: number): { isMirror: boolean, length: number } {
  const isIndexOk = (i: number) => i >= 0 && i < matrix[0].length

  let p2 = start
  let p1 = start - 1
  let length = 0
  let isMirror: boolean = true
  while (isIndexOk(p1) && isIndexOk(p2)) {
    if (!compareArrays(column(matrix, p1), column(matrix, p2))) {
      isMirror = false
      break
    }

    p1--
    p2++
    length++
  }

  return { isMirror, length }
}

function isMirrorInX(matrix: string[][], start: number): { isMirror: boolean, length: number } {
  const isIndexOk = (i: number) => i >= 0 && i < matrix.length

  let p2 = start
  let p1 = start - 1
  let length = 0
  let isMirror: boolean = true
  while (isIndexOk(p1) && isIndexOk(p2)) {
    if (!compareArrays(matrix[p1], matrix[p2])) {
      isMirror = false
      break
    }

    p1--
    p2++
    length++
  }

  return { isMirror, length }
}

function column(matrix: string[][], col: number): string[] {
  var column = [];
  for (var i = 0; i < matrix.length; i++) {
    column.push(matrix[i][col]);
  }
  return column;
}

function find2NearCols(matrix: string[][]): number[] {
  const result: number[] = []
  for (let i = 1; i < matrix[0].length; i++) {
    const current = column(matrix, i)
    const previous = column(matrix, i - 1)

    if (compareArrays(current, previous))
      result.push(i)
  }

  return result
}

function find2NearRows(matrix: string[][]): number[] {
  const result: number[] = []
  for (let i = 1; i < matrix.length; i++) {
    const current = matrix[i]
    const previous = matrix[i - 1]

    if (compareArrays(current, previous))
      result.push(i)
  }

  return result
}

function compareArrays(arr1: string[], arr2: string[]): boolean {
  for (let i = 0; i < arr1.length; i++) {
    const element = arr1[i]
    if (element !== arr2[i]) {
      return false
    }
  }

  return true
}


console.log(solution(input))