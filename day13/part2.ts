import { input } from "./input.test.env"

function solution(input: string): number {
  const matrixArray = input.split('\n\n')

  const result: number[] = []
  for (const array of matrixArray) {
    const matrix = array.split('\n').map(row => row.split(''))

    const nearRows = find2Near(matrix, 'row')
    const nearColumns = find2Near(matrix, 'column')

    const firstMirror = findMirror(matrix, nearRows, nearColumns)

    const tolerance = 1
    const visitedRow = firstMirror.type === 'row' ? [firstMirror.i] : []
    const otherRows = find2Near(matrix, 'row', tolerance, visitedRow)

    const visitedCol = firstMirror.type === 'column' ? [firstMirror.i] : []
    const otherCols = find2Near(matrix, 'column', tolerance, visitedCol)

    const secondMirror = findMirror(matrix, otherRows, otherCols, tolerance)

    const value = secondMirror.type === 'row' ? secondMirror.i * 100 : secondMirror.i
    result.push(value)
  }

  return result.reduce((sum, current) => sum + current, 0)
}

function findMirror(matrix: string[][], rowsIndex: number[], colsIndex: number[], tolerance = 0) {
  const maybeMirrors: { type: 'row' | 'column', i: number, length: number }[] = []
  for (const i of colsIndex) {
    const mirror = isMirror(matrix, 'column', i, tolerance)
    if (!mirror) continue

    maybeMirrors.push({ type: "column", i: i, length: mirror.length })
  }

  for (const i of rowsIndex) {
    const mirror = isMirror(matrix, 'row', i, tolerance)
    if (!mirror) continue

    maybeMirrors.push({ type: 'row', i: i, length: mirror.length })
  }

  return maybeMirrors.sort((a, b) => a.length - b.length)[0]
}

function isMirror(matrix: string[][], type: "row" | "column", start: number, tolerance: number): { length: number } | null {
  const getArray = (p: number) => type === 'row' ? matrix[p] : column(matrix, p)
  const end = type === 'row' ? matrix.length : matrix[0].length
  const isIndexOk = (i: number) => i >= 0 && i < end

  let p2 = start
  let p1 = start - 1
  let length = 0
  let smudges = 0
  while (isIndexOk(p1) && isIndexOk(p2)) {
    smudges += compareArrays(getArray(p1), getArray(p2))
    if (smudges > tolerance) return null

    p1--
    p2++
    length++
  }

  return { length }
}

function column(matrix: string[][], col: number): string[] {
  var column = [];
  for (var i = 0; i < matrix.length; i++) {
    column.push(matrix[i][col]);
  }
  return column;
}

function find2Near(matrix: string[][], type: "row" | "column", tolerance = 0, ignore: number[] = []) {
  const getArray = (p: number) => type === 'row' ? matrix[p] : column(matrix, p)
  const end = type === 'row' ? matrix.length : matrix[0].length
  const near: number[] = []
  for (let i = 1; i < end; i++) {
    const current = getArray(i)
    const previous = getArray(i - 1)

    if (ignore.includes(i)) continue

    if (compareArrays(current, previous) <= tolerance)
      near.push(i)
  }

  return near
}

function compareArrays(arr1: string[], arr2: string[]): number {
  let result = 0
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) result++
  }

  return result
}


console.log(solution(input))