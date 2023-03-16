import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorFormatService {
  constructor() { }

  hexToRgba(hex: string) {
    let rgba = '';
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    let a = 1;
    rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
    return rgba;
  }

  rgbaToHsl(rgba: string) {
    const [r, g, b, a] = rgba.substring(5, rgba.length - 1).split(',').map(parseFloat);
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    let h: number = 0;
    let s: number = 0;
    let l: number = 0;
    l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case red:
          h = (green - blue) / d + (green < blue ? 6 : 0);
          break;
        case green:
          h = (blue - red) / d + 2;
          break;
        case blue:
          h = (red - green) / d + 4;
          break;
      }
      h /= 6;
    }
    return `hsl(${Math.floor(h * 360)}, ${Math.floor(s * 100)}%, ${Math.floor(l * 100)}%)`;
  }
}