import { Component, HostBinding, OnInit } from '@angular/core';
import { StorageService } from '@shared/services/storage.service';
import { ThemeService } from '@shared/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass : any;
  theme: string;
  constructor(
    private themeService: ThemeService, 
    private storageService: StorageService,
    public overlayContainer: OverlayContainer
    ){}
  
  ngOnInit():void{
    this.componentCssClass = this.storageService.get('themeColor');
    this.getThemeService();
    
  }

  getThemeService():void{
    const overlay = this.overlayContainer.getContainerElement().classList;
    this.themeService.theme$.subscribe(data => {
      if (overlay.contains(this.theme)) {
        overlay.remove(this.theme);
      }
      overlay.add(data);
      this.theme = data;
      this.componentCssClass = data;
    });
  }
}
