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
  dashboard: boolean;
  isAdmin: boolean;
  home: boolean;
  brandImage: string;
  loginIcon: string;
  darkIcon: string;
  lightIcon:string;
  dashboardIcon: string;
  menuIcon: string;
  homeIcon: string;
  
  constructor(
    private themeService: ThemeService, 
    private storageService: StorageService,
    private router: Router
    ) {
      this.menuIcon = 'menu';
      this.brandImage =  'assets/logo.png';
      this.loginIcon = 'login';
      this.darkIcon = 'dark_mode';
      this.lightIcon = 'light_mode';
      this.dashboardIcon = 'space_dashboard';
      this.homeIcon = 'home';
    }

  ngOnInit(): void {
    this.theme = this.storageService.get('theme');
    this.dashboard = this.storageService.get('dashboard');
    this.isAdmin = this.storageService.get('admin');
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
    this.dashboard = !this.dashboard;
    this.storageService.set('dashboard', this.dashboard);
    this.isAdmin = !this.isAdmin;
    this.storageService.set('admin', this.isAdmin);
  }

  goToHome(){
    this.router.navigate(['/home']);
    this.dashboard = !this.dashboard;
    this.storageService.set('dashboard', this.dashboard);
    this.isAdmin = !this.isAdmin;
    this.storageService.set('admin', this.isAdmin);
  }

  goToLogin(): void{
    this.router.navigate(['/auth/login']);
  }

}
