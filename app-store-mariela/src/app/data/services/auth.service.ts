import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '@data/models/login';
import { NewUser } from '@data/models/newUser';
import { Token } from '@data/models/token';
import { User } from '@data/models/user';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = environment.authUrl;
    constructor(private http: HttpClient) { }

    create(newUser: NewUser): Observable<any> {
        const requestOptions: Object = {
            /* other options here */
            responseType: 'text'
        }
        return this.http.post<any>(this.authUrl + '/create', newUser, requestOptions);
    }

    login(login: Login): Observable<Token> {
        return this.http.post<Token>(this.authUrl + '/login', login);
    }

    getUser(userName: string): Observable<User>{
        return this.http.get<User>(this.authUrl + '/user/' + userName)
    }


}