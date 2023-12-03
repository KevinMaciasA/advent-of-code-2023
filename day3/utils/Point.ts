class Point {
  x: number
  y: number

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y
  }
}

export { Point }