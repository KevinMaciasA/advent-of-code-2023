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

  isTop(other: Point): boolean {
    return other.y + 1 === this.y && other.x === this.x
  }

  isBottom(other: Point): boolean {
    return other.y - 1 === this.y && other.x === this.x
  }

  isLeft(other: Point): boolean {
    return other.x + 1 === this.x && other.y === this.y
  }

  isRight(other: Point): boolean {
    return other.x - 1 === this.x && other.y === this.y
  }

  move(other: Point): Point {
    this.x = other.x
    this.y = other.y

    return this
  }

  moveRelative(other: Point): Point {
    this.x += other.x
    this.y += other.y

    return this
  }
}

export { Point }