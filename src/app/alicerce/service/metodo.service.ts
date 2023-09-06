import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { Metodo } from '../model/metodo';

@Injectable({
    providedIn: 'root',
})
export class MetodoService {

    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError(
            'MetodoService'
        );
    }

    list(pesquisa: string): Observable<Metodo[]> {
        return this.http
            .get<Metodo[]>(
                `http://localhost:8080/metodo?pesquisa=${pesquisa}`
            )
            .pipe(catchError(this.handleError('list', [])));
    }

    save(record: Metodo): Observable<Metodo> {
        return this.http
            .post<Metodo>(
                'http://localhost:8080/metodo',
                record
            )
            .pipe(catchError(this.handleError('save', {})));
    }

    delete(record: Metodo): Observable<any> {
        return this.http
            .delete<any>('http://localhost:8080/metodo/' + record.id)
            .pipe(catchError(this.handleError('delete', [])));
    }

}
