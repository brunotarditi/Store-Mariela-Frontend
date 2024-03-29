import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@data/models/user';
import { AuthService } from '@data/services/auth.service';
import { TokenService } from '@data/services/token.service';
import { Icons } from '@data/utils/constants/icons';
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
  isDashboard: boolean;
  isLogged = false;
  isAdmin = false;
  brandImage: string;
  userName: string;
  user: User;
  constructor(
    private themeService: ThemeService,
    private storageService: StorageService,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.brandImage = 'assets/logo.png';
  }

  get Icons() { return Icons }
  
  ngOnInit(): void {
    this.userName = this.tokenService.getUserName();
    this.authService.getUser(this.userName).subscribe((data) => {
      this.user = data;
    });
    this.theme = this.storageService.get('theme');
    this.isAdmin = this.tokenService.isAdmin();
    this.isLogged = this.tokenService.isLogged();
    this.isDashboard = this.router.url == '/home' ? false : true
  }

  onSetDrawer() {
    this.drawer.emit();
  }

  changeMode() {
    if (this.theme) {
      this.theme = !this.theme;
      this.themeService.theme$.emit('light-theme');
      this.storageService.set('theme', this.theme);
      this.storageService.set('themeColor', 'light-theme');

    } else {
      this.theme = !this.theme;
      this.themeService.theme$.emit('dark-theme');
      this.storageService.set('theme', this.theme);
      this.storageService.set('themeColor', 'dark-theme');
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard/admin']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login-register']);
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
