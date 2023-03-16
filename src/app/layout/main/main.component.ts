import { Component, Input } from '@angular/core';

@Component({
  selector: 'palette-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor() { }
  @Input() colors!: string[];
}
