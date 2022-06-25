import { Component, OnInit } from '@angular/core';
import { StorageService } from '@shared/services/storage.service';
import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  class: string;
  constructor(private storageService: StorageService, private themeService: ThemeService) { }

  ngOnInit(): void {
    if(this.storageService.get('theme'))
      this.class = 'panel-dark';
    else
      this.class = 'panel-light';
    this.getThemeService();
  }

  getThemeService():void{
    this.themeService.theme$.subscribe(data => {
      if(data == 'dark-theme')
        this.class = 'panel-dark';
      else
      this.class = 'panel-light';
    });
  }

}
