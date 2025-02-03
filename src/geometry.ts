class Rect {
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    return this;
  }

  x: number;
  y: number;
  width: number;
  height: number;

  pos(): Vec2 {
    return new Vec2(this.x, this.y);
  }
}

class Vec2 {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    return this;
  }

  x: number;
  y: number;

  add(pos2: Vec2): Vec2 {
    return new Vec2(this.x + pos2.x, this.y + pos2.y);
  }
  subtract(pos2: Vec2) {
    return new Vec2(this.x - pos2.x, this.y - pos2.y);
  }

  toArray(): [number, number] {
    return [this.x, this.y];
  }
}

export { Rect, Vec2 };
