import { palette } from './../models/palette.model';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PaletteService {
  @Output() palettes: palette[] = this.getPalettes();
  @Output() openPaletteById: EventEmitter<string> = new EventEmitter();

  setPalettes(palette: palette) {
    this.palettes.push(palette);
    localStorage.setItem('palettes', JSON.stringify(this.palettes));
  }

  getPalettes() {
    let palettes = localStorage.getItem('palettes');
    if (palettes) {
      this.palettes = JSON.parse(palettes);
      return this.palettes;
    } else {
      return [];
    }
  }

  getLastPalette() {
    let lastPalette = this.palettes[this.palettes.length - 1];
    return lastPalette;
  }

  deletePaletteById(id: string) {
    let tempArr = this.getPalettes();
    let index = tempArr.findIndex(i => i.id == id);
    if (index != -1) {
      tempArr.splice(index, 1);
      this.palettes = tempArr;
      localStorage.setItem('palettes', JSON.stringify(this.palettes));
    }
  }

  getPaletteById(id: string) {
    let tempArr = this.getPalettes();
    let findPalette = tempArr.find(i => i.id == id);
    let palette: palette;
    if (findPalette) {
      palette = findPalette;
      return palette;
    }
    return;
  }

  generatePalette(maxPalette: number) {
    let tempColor: Array<any> = [];
    for (let i = 0; i < maxPalette; i++) {
      let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
      randomHex = `#${randomHex.padStart(6, "0")}`;
      tempColor.push(randomHex);
    }
    let newPalette = new palette(tempColor);
    this.setPalettes(newPalette);
    return newPalette;
  }
}
