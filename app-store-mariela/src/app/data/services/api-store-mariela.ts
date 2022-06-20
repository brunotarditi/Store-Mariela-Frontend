import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';

export class ApiStoreMariela {

    protected apiUrl = environment.apiUrl;
    protected header: HttpHeaders = new HttpHeaders().set('Content-type', 'application/json');

    constructor(protected http: HttpClient) { }

    error(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent)
            errorMessage = error.error.message;
        else
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        return of({ error: true, msg: errorMessage, data: null });
    }

}
