import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '@shared/services/storage.service';
import { ThemeService } from '@shared/services/theme.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() drawer = new EventEmitter<any>();
  theme: boolean;
  constructor(private themeService: ThemeService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.theme = this.storageService.get('theme');
  }

  onSetDrawer(){
    this.drawer.emit();
  }

  changeMode(){
    if (this.theme) {
      this.theme = !this.theme;
      this.themeService.theme$.emit('light-theme');
      this.storageService.set('theme', this.theme);
      this.storageService.set('themeColor', 'light-theme');

    }else{
      this.theme = !this.theme;
      this.themeService.theme$.emit('dark-theme');
      this.storageService.set('theme', this.theme);
      this.storageService.set('themeColor', 'dark-theme');
    }
  }

}
