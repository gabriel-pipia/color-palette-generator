import { PaletteService } from './../../services/palette.service';
import { DataShareService } from './../../services/data-share.service';
import { palette } from './../../models/palette.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'palette-recent-color',
  templateUrl: './recent-color.component.html',
  styleUrls: ['./recent-color.component.scss']
})
export class RecentColorComponent {
  constructor(private DataShareService: DataShareService, private PaletteService: PaletteService) { }
  @Input() palette!: palette;
  @Input() index!: number;
  colors: any[] = [];

  ngOnInit(): void {
    this.colors = this.palette.colors;
  }

  openDropdown(e: any) {
    let elem = e.target;
    let top = Math.floor(elem.getBoundingClientRect().top);
    let right = window.innerWidth - Math.floor(elem.getBoundingClientRect().right);
    let pos;
    if ((top + 185) > window.innerHeight - 10) {
      pos = 'bottom';
      top = top - 202;
    } else {
      pos = 'top';
    }
    let obj = {
      'top': top,
      'right': right,
      'pos': pos,
      'id': this.palette.id
    }
    this.DataShareService.dropdownAction.emit(true);
    this.DataShareService.dropdown.emit(obj);
  }

  openPalette() {
    this.PaletteService.openPaletteById.emit(this.palette.id);
    this.DataShareService.asideAction.emit(false);
  }
}
