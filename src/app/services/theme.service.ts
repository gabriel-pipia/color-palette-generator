import { Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  constructor() { }
  @Output() theme: string = this.getTheme();

  setTheme(theme: string) {
    localStorage.setItem('theme', JSON.stringify(theme));
  }

  getTheme() {
    let theme = localStorage.getItem('theme');
    if (theme) {
      return JSON.parse(theme);
    } else {
      return 'light';
    }
  }
}
