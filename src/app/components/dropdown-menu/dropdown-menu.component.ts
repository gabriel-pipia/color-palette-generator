import { palette } from './../../models/palette.model';
import { PaletteService } from './../../services/palette.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { Component } from '@angular/core';

@Component({
  selector: 'palette-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  constructor(private DataShareService: DataShareService, private PaletteService: PaletteService) { }
  top: string = '0px';
  right: string = '0px';
  active: boolean = false;
  position: string = 'top';
  curentPalette!: palette;

  ngOnInit(): void {
    this.DataShareService.dropdownAction.subscribe((action: boolean) => {
      this.active = action;
    });
    this.DataShareService.dropdown.subscribe(obj => {
      this.top = `${obj.top + 45}px`;
      this.right = `${obj.right - 2}px`;
      this.position = obj.pos;
      let palette = this.PaletteService.getPaletteById(obj.id);
      if (palette) {
        this.curentPalette = palette;
      }
    });
  }

  onDeletePalette() {
    this.PaletteService.deletePaletteById(this.curentPalette.id);
    this.DataShareService.onPaletteDelete.emit();
    this.active = false;
  }

  onOpenPalette() {
    this.active = false;
    this.PaletteService.openPaletteById.emit(this.curentPalette.id);
    this.DataShareService.asideAction.emit(false);
  }

  onOpenQuickView() {
    let obj = {
      'colors': this.curentPalette.colors,
      'index': 0,
      'action': true
    }
    this.DataShareService.quickViewDataEmitter.emit(obj);
    this.active = false;
  }
}
