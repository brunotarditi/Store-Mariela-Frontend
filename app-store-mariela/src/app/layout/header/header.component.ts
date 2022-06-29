import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  brandImage: string;
  loginIcon: string;
  darkIcon: string;
  lightIcon:string;
  dashboardIcon: string;
  
  constructor(
    private themeService: ThemeService, 
    private storageService: StorageService,
    private router: Router
    ) {
      this.brandImage =  'assets/logo.png';
      this.loginIcon = 'login';
      this.darkIcon = 'dark_mode';
      this.lightIcon = 'light_mode';
      this.dashboardIcon = 'space_dashboard';
    }

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

  goToDashboard(){
    this.router.navigate(['/dashboard/admin']);
  }

}
