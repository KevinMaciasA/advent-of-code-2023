import { input } from "./input.env"

function solution(input: string): number {
  const inputArray = input.split(",")
  const hashMap = new HashMap()
  inputArray.forEach((str) => {
    hashMap.do(str)
  })

  return hashMap.focusPower()
}

function hashAlgorithm(input: string): number {
  let current = 0
  for (let i = 0; i < input.length; i++) {
    current += input.charCodeAt(i)
    current *= 17
    current %= 256
  }

  return current
}

class HashMap {
  private size: number = 256
  private map: Array<string[]> = new Array(this.size)

  constructor() {
  }

  do(str: string): void {
    const wantToRemove = str.includes("-")

    if (wantToRemove) {
      this.remove(str)
    } else {
      this.add(str)
    }
  }

  remove(str: string): void {
    const [box, rest] = str.split("-")
    const hash = hashAlgorithm(box)
    const arr = this.map[hash]

    if (!arr) return

    const result = arr.filter((content) => {
      const [boxNumber, numberString] = content.split(" ")
      return boxNumber !== box
    })

    this.map[hash] = result.length === 0 ? undefined : result
  }

  add(str: string): void {
    const [box, numberString] = str.split("=")
    const hash = hashAlgorithm(box)
    const arr = this.map[hash]

    const content = `${box} ${numberString}`

    if (arr === undefined) {
      this.map[hash] = [content]
    } else {
      if (!this.has(box)) arr.push(content)
      else this.update(box, numberString)
    }
  }

  private has(box: string): boolean {
    const hash = hashAlgorithm(box)
    const arr = this.map[hash]

    if (!arr) return false

    return arr.some((content) => {
      const [boxNumber, numberString] = content.split(" ")
      return boxNumber === box
    })
  }

  private update(box: string, value: string) {
    const hash = hashAlgorithm(box)
    const arr = this.map[hash]

    if (!arr) return

    const index = arr.findIndex((content) => {
      const [boxNumber, numberString] = content.split(" ")
      return boxNumber === box
    })

    arr[index] = `${box} ${value}`
  }

  focusPower(): number {
    let results: number[] = []
    for (let box = 0; box < this.map.length; box++) {
      const content = this.map[box]

      if (!content) continue

      for (let i = 0; i < content.length; i++) {
        const [boxString, focalLengthString] = content[i].split(" ")
        let sum = box + 1
        sum *= i + 1
        sum *= parseInt(focalLengthString)
        results.push(sum)
      }
    }

    return results.reduce((sum, curr) => sum + curr, 0)
  }
}

console.log(solution(input))