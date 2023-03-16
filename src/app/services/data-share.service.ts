import { EventEmitter, Output, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  constructor() { }
  @Output() asideAction: EventEmitter<boolean> = new EventEmitter();
  @Output() quickViewDataEmitter: EventEmitter<any> = new EventEmitter();
  @Output() generatePalette: EventEmitter<any> = new EventEmitter();
  @Output() dropdownAction: EventEmitter<boolean> = new EventEmitter();
  @Output() dropdown: EventEmitter<any> = new EventEmitter();
  @Output() onPaletteDelete: EventEmitter<any> = new EventEmitter();
}
