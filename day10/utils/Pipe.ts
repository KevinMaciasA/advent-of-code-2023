import { Point } from "./Point";

abstract class Pipe {
  type: string
  movement: Point
  position: Point

  constructor(type: string, position: Point) {
    this.type = type
    this.position = position
  }

  static fromChar(char: string, position: Point): Pipe {
    const PipeTypes = {
      "|": IPipe,
      "-": dashPipe,
      "L": LPipe,
      "J": JPipe,
      "7": SevenPipe,
      "F": FPipe,
    }

    return new PipeTypes[char](position)
  }

  static typeChars = ["|", "-", "L", "J", "7", "F"]

  abstract canEnter(from: Point): boolean

  canConnect(pipe: Pipe): boolean {
    return this.canEnter(pipe.position)
  }
}

class IPipe extends Pipe {
  constructor(position: Point) {
    super("|", position)
  }

  canEnter(from: Point): boolean {
    return this.position.isTop(from) || this.position.isBottom(from)
  }
}

class dashPipe extends Pipe {
  constructor(position: Point) {
    super("-", position)
  }

  canEnter(from: Point): boolean {
    return this.position.isLeft(from) || this.position.isRight(from)
  }
}

class LPipe extends Pipe {
  constructor(position: Point) {
    super("L", position)
  }

  canEnter(from: Point): boolean {
    return this.position.isTop(from) || this.position.isRight(from)
  }
}

class JPipe extends Pipe {
  constructor(position: Point) {
    super("J", position)
  }

  canEnter(from: Point): boolean {
    return this.position.isTop(from) || this.position.isLeft(from)
  }
}

class SevenPipe extends Pipe {
  constructor(position: Point) {
    super("7", position)
  }

  canEnter(from: Point): boolean {
    return this.position.isBottom(from) || this.position.isLeft(from)
  }
}

class FPipe extends Pipe {
  constructor(position: Point) {
    super("F", position)
  }

  canEnter(from: Point): boolean {
    return this.position.isBottom(from) || this.position.isRight(from)
  }
}

export { Pipe }
