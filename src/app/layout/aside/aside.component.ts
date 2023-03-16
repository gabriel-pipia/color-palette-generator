import { palette } from './../../models/palette.model';
import { DataShareService } from './../../services/data-share.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'palette-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  constructor(private DataShareService: DataShareService) { }
  @Input() activeAside: boolean = false;
  @Input() palettes: palette[] = [];

  openAside(action: boolean) {
    this.DataShareService.asideAction.emit(action);
  }
}
