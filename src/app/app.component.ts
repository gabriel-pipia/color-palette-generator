import { PaletteService } from './services/palette.service';
import { palette } from './models/palette.model';
import { DataShareService } from './services/data-share.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private DataShareService: DataShareService, private PaletteService: PaletteService) { }
  activeAside: boolean = false;
  activeQuickView: boolean = false;
  curentPalette!: palette;
  palettes!: palette[];
  colors!: string[];
  quickViewColors!: string[];
  quickViewIndex!: number;

  ngOnInit(): void {
    this.onGeneratePalette();
    this.DataShareService.asideAction.subscribe(action => {
      this.activeAside = action;
    });
    this.DataShareService.quickViewDataEmitter.subscribe(data => {
      this.onOpenQuickView(data);
    });
    this.PaletteService.openPaletteById.subscribe((id: string) => {
      let currentPalette = this.PaletteService.getPaletteById(id);
      if (currentPalette) {
        this.curentPalette = currentPalette;
        this.colors = this.curentPalette.colors;
      }
    });
    this.DataShareService.onPaletteDelete.subscribe(() => {
      this.palettes = this.PaletteService.getPalettes();
      if (this.palettes.length == 0) {
        this.onGeneratePalette();
      } else {
        this.onUpdatePalette(this.PaletteService.getLastPalette());
      }
    });
  }

  onCloseQuickView() {
    this.activeQuickView = false;
  }

  onOpenQuickView(data: any) {
    this.activeQuickView = data.action;
    this.quickViewColors = data.colors;
    this.quickViewIndex = data.index;
  }

  onUpdatePalette(palette: palette) {
    this.curentPalette = palette;
    this.palettes = this.PaletteService.getPalettes();
    this.colors = this.curentPalette.colors;
    this.quickViewColors = this.colors;
    this.quickViewIndex = 0;
  }

  onGeneratePalette() {
    this.curentPalette = this.PaletteService.generatePalette(5);
    this.palettes = this.PaletteService.getPalettes();
    this.colors = this.curentPalette.colors;
    this.quickViewColors = this.colors;
    this.quickViewIndex = 0;
  }
}
