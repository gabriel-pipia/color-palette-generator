import { palette } from './../../models/palette.model';
import { PaletteService } from './../../services/palette.service';
import { DataShareService } from './../../services/data-share.service';
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'palette-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private DataShare: DataShareService, private PaletteService: PaletteService) { }
  @Input() palettes!: palette[];
  @Output() updatePalette: EventEmitter<palette> = new EventEmitter();
  @Output() generatePaletteEmit: EventEmitter<any> = new EventEmitter();
  @Output() quickViewActionEmit: EventEmitter<any> = new EventEmitter();
  disabledPrevButton: boolean = false;
  disabledNextButton: boolean = false;
  @Input() curentPalette!: palette;
  index!: number;

  ngOnInit(): void {
    this.findIndex();
    this.checkIndex();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.index = this.palettes.findIndex(i => i.id == this.curentPalette.id);
    this.checkIndex();
  }

  onPrevPalette() {
    this.palettes = this.PaletteService.getPalettes();
    this.index = this.index - 1;
    this.checkIndex();
    this.curentPalette = this.palettes[this.index];
    this.updatePalette.emit(this.curentPalette);
    this.PaletteService.openPaletteById.emit(this.curentPalette.id);
  }

  onNextPalette() {
    this.palettes = this.PaletteService.getPalettes();
    this.index = this.index + 1;
    this.checkIndex();
    this.curentPalette = this.palettes[this.index];
    this.updatePalette.emit(this.curentPalette);
    this.PaletteService.openPaletteById.emit(this.curentPalette.id);
  }

  checkIndex() {
    if (this.index <= 0) {
      this.index = 0;
      this.disabledPrevButton = true;
    } else {
      this.disabledPrevButton = false;
    }
    if (this.index >= this.palettes.length - 1) {
      this.index = this.palettes.length - 1;
      this.disabledNextButton = true;
    } else {
      this.disabledNextButton = false;
    }
  }

  openAside(action: boolean) {
    this.DataShare.asideAction.emit(action);
  }

  onOpenQuickView() {
    let obj = {
      'colors': this.curentPalette.colors,
      'index': 0,
      'action': true
    }
    this.quickViewActionEmit.emit(obj);
  }

  updataPalette() {
    this.updatePalette.emit(this.curentPalette);
    this.checkIndex();
  }

  generatePalette() {
    this.generatePaletteEmit.emit();
    this.checkIndex();
  }

  findIndex() {
    this.index = this.palettes.findIndex(i => i.id == this.curentPalette.id);
    if (this.index == -1) {
      this.index = this.palettes.length - 1;
    }
  }
}
