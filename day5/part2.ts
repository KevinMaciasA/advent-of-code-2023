import { input } from "./input.env"
import { generator } from "./utils/generator"
import { groupByPair } from "./utils/groupByPair"

function solution(input: string): number {
  const almanac = Almanac.fromString(input)
  let min = Number.MAX_VALUE
  for (const generator of almanac.seedsGenerators) {
    for (const seed of generator) {
      const result = almanac.applyAllMaps(seed)
      if (result < min) min = result
    }
  }

  return min
}

class MapSection {
  name: string
  maps: Mapper[]

  constructor(name: string, maps: Mapper[]) {
    this.name = name
    this.maps = maps
  }

  output(x: number) {
    const target = this.maps.find((map) => map.contains(x))

    if (!target) return x

    return target.map(x)
  }
}

class Mapper {
  dest: number
  source: number
  range: number
  minInput: number
  maxInput: number

  constructor(dest: number, source: number, range: number) {
    this.dest = dest
    this.source = source
    this.range = range
    this.minInput = source
    this.maxInput = source + (range - 1)
  }

  map(x: number): number {
    const delta = x - this.minInput
    return this.dest + delta
  }

  contains(x: number): boolean {
    return this.minInput <= x && x <= this.maxInput
  }
}

class Almanac {
  seedsGenerators: Generator<number>[]
  maps: MapSection[]

  constructor(seedsGenerators: Generator<number>[], maps: MapSection[]) {
    this.seedsGenerators = seedsGenerators
    this.maps = maps
  }

  applyAllMaps(seed: number) {
    return this.maps.reduce((acc, map) => {
      return map.output(acc)
    }, seed)
  }

  static fromString(input: string): Almanac {
    const inputArray = input.split('\n\n')

    const seedsSection = inputArray.find((section) => section.includes('seeds:'))
    const [_seeds, seedsInfo] = seedsSection.split(': ')
    const splitSeeds = seedsInfo.split(' ').map(Number)

    const seedsRange = groupByPair(splitSeeds)
    const seedsGenerators = seedsRange.map(([start, range]) => {
      return generator(start, range)
    })


    const mapSections = []
    for (const section of inputArray) {
      const [name, info] = section.split(':')
      const infoTrim = info.substring(1)

      if (!name.includes(' map')) continue

      const infoArray = infoTrim.split('\n')

      const maps = infoArray.map((row) => {
        const [dest, source, range] = row.split(' ').map(Number)
        return new Mapper(dest, source, range)
      })

      mapSections.push(new MapSection(name, maps))
    }

    return new Almanac(seedsGenerators, mapSections)
  }
}

console.log(solution(input))