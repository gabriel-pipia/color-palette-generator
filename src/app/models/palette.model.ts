export class palette {
  id: string = this.randomPaletteId();
  colors: Array<string>;
  constructor(colors: Array<any>) {
    this.colors = colors;
  }
  randomPaletteId() {
    return 'xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
      var Rundom = Math.random() * 16 | 0,
        v = c == 'x' ? Rundom : (Rundom & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}