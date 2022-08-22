import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '@data/models/login';
import { NewUser } from '@data/models/newUser';
import { AuthService } from '@data/services/auth.service';
import { TokenService } from '@data/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  login: Login;
  newUser: NewUser;
  isLogged: boolean;
  hide = true;
  newUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private authService: AuthService, 
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isLogged = (this.tokenService.getToken() != null)
  }

  onLogin(login: Login): void {
    this.login = new Login(login.userName, login.password);
    this.authService.login(this.login).subscribe(data => {
      console.log(data)
      this.tokenService.setToken(data.token);
      this.router.navigate(['/home']);
    },
    err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: err.error.message,
      });
    })
  }

  onCreate(newUser: NewUser): void {
    this.newUser = new NewUser(newUser.firstName, newUser.lastName, newUser.userName, newUser.password, "user");
    this.authService.create(this.newUser).subscribe(data => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Cuenta creada',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });;
    },
    err => {
      Swal.fire({
        icon: 'error',
        title: err.error.message,
      });
    });
  }

  goToHome(){
    this.router.navigate(['/']);
  }
}
