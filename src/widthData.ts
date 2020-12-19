class Width {
  static widths = [
    new Width(480, 7680, 0),
    new Width(240, 15600, -140),
    new Width(120, 31440, 0),
  ]
  width: number;
  displacement: number;
  y: number;

  constructor(width: number, displacement: number, y: number) {
    this.width = width;
    this.displacement = displacement;
    this.y = y;
  }

  static getWidth(width: number): Width {
    return this.widths.find(w => w.width === width);
  }
}

export {
  Width
}
