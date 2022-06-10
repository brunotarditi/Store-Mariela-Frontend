import { Component, HostBinding, OnInit } from '@angular/core';
import { StorageService } from './shared/services/storage.service';
import { ThemeService } from './shared/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass : any;
  
  constructor(
    private themeService: ThemeService, 
    private storageService: StorageService,
    public overlayContainer: OverlayContainer){}
  
  ngOnInit():void{
    this.componentCssClass = this.storageService.get('themeColor');
    this.getThemeService();
  }

  getThemeService():void{
    this.themeService.theme$.subscribe(data => {
      this.overlayContainer.getContainerElement().classList.add(data);
      this.componentCssClass = data;
    });
  }
}
