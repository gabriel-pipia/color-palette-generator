import { ColorFormatService } from './../../services/color-format.service';
import { DataShareService } from '../../services/data-share.service';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'palette-quick-view-popup',
  templateUrl: './quick-view-popup.component.html',
  styleUrls: ['./quick-view-popup.component.scss']
})
export class QuickViewPopupComponent {
  constructor(private ColorFormatService: ColorFormatService) { }
  @Input() activeQuickView!: boolean;
  @Output() quickViewActionEmit: EventEmitter<boolean> = new EventEmitter();
  @Input() colors!: any[];
  @Input() index!: number;
  selectedColor: string = '';
  hex: string = '';
  rgb: string = '';
  hsl: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.formatColor(this.index);
  }

  onChanges(color: string) {
    this.selectedColor = color;
    let index = this.colors.findIndex(i => i == this.selectedColor);
    this.formatColor(index);
  }

  formatColor(index: number) {
    this.selectedColor = this.colors[index];
    this.hex = this.selectedColor;
    this.rgb = this.ColorFormatService.hexToRgba(this.selectedColor);
    this.hsl = this.ColorFormatService.rgbaToHsl(this.rgb);
  }

  checkContrast(hex: string) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    if (r + g + b > 360) {
      return 'black';
    } else {
      return 'white';
    }
  }

  copyColor(e: any, color: string) {
    let elem = e.target.querySelector('.copy-text');
    navigator.clipboard.writeText(color).then(() => {
      elem.innerHTML = 'copyed!';
      setTimeout(() => { elem.innerHTML = 'copy'; }, 1000);
    }).catch(() => { alert('Failed to copy the color code!') });
  }

  closeQuickView() {
    this.activeQuickView = false;
    this.quickViewActionEmit.emit();
  }
}
