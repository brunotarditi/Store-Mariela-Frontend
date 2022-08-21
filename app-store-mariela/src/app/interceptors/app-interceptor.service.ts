import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, concatMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '@data/services/token.service';
import { AuthService } from '@data/services/auth.service';
import { Token } from '@data/models/token';

const AUTHORIZATION = 'Authorization';
@Injectable({
    providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {

    constructor(
        private tokenService: TokenService, 
        private authService: AuthService
        ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        throw new Error('Method not implemented.');
    }
    
    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({
            headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token),
        });
    }
}
export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptorService, multi: true }]