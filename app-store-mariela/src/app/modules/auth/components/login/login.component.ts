import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '@data/models/login';
import { AuthService } from '@data/services/auth.service';
import { TokenService } from '@data/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: Login;
  isLogged: boolean;

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private authService: AuthService, 
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.isLogged = (this.tokenService.getToken() != null)
  }

  onLogin(login: Login): void {
    this.login = new Login(login.userName, login.password);
    this.authService.login(this.login).subscribe(data => {
      console.log(data)
      this.tokenService.setToken(data.token);
      window.location.reload();
    },
    err => {
      console.log(err)
    })
  }

}
