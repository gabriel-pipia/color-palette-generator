import { DataShareService } from 'src/app/services/data-share.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'palette-color-card',
  templateUrl: './color-card.component.html',
  styleUrls: ['./color-card.component.scss']
})
export class ColorCardComponent {
  constructor(private DataShareService: DataShareService) { }
  @Input() colors: any[] = [];
  @Input() hexCode: string = '';
  @Input() index: number = 0;

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
    let colorCodeElem = e.target.offsetParent.querySelector('.color-code');
    navigator.clipboard.writeText(color).then(() => {
      if (colorCodeElem.classList.contains('color-code')) {
        colorCodeElem.innerHTML = 'copyed!';
        setTimeout(() => { colorCodeElem.innerHTML = color; }, 1000);
      }
    }).catch(() => { alert('Failed to copy the color code!') });
  }

  openQuickView() {
    let obj = {
      'colors': this.colors,
      'index': this.index,
      'action': true
    }
    this.DataShareService.quickViewDataEmitter.emit(obj);
  }
}
