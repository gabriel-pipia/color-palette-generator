import { ThemeService } from './../../services/theme.service';
import { Component } from '@angular/core';

@Component({
  selector: 'palette-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private ThemeService: ThemeService) { }
  theme: string = this.ThemeService.theme;

  ngOnInit(): void {
    this.setTheme();
  }

  toggleDarkMode() {
    this.theme = this.theme == 'dark' ? 'light' : 'dark';
    this.setTheme();
  }

  setTheme() {
    let html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(this.theme);
    this.ThemeService.setTheme(this.theme);
  }
}
