import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '@data/models/login';
import { NewUser } from '@data/models/newUser';
import { Token } from '@data/models/token';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = environment.authUrl;
    constructor(private http: HttpClient) { }

    create(nuevoUsuario: NewUser): Observable<any> {
        const requestOptions: Object = {
            /* other options here */
            responseType: 'text'
        }
        return this.http.post<any>(this.authUrl + '/create', nuevoUsuario, requestOptions);
    }

    login(loginUsuario: Login): Observable<Token> {
        return this.http.post<Token>(this.authUrl + '/login', loginUsuario);
    }


}