import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "@data/services/token.service";
import { Observable } from "rxjs";

const AUTHORIZATION = 'Authorization';

@Injectable({
    providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let intReq = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            intReq = this.addToken(req, token);
        }
        return next.handle(intReq);
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({
            headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token),
        });
    }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }]