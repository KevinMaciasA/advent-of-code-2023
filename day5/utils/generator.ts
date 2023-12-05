function* generator(start: number, range: number): Generator<number> {
  let i = start
  const end = start + range
  while (i < end) {
    yield i
    i++
  }
}

export { generator }