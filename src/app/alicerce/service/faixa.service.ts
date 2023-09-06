import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { Faixa } from '../model/faixa';

@Injectable({
    providedIn: 'root',
})
export class FaixaService {

    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError(
            'FaixaService'
        );
    }

    list(pesquisa: string): Observable<Faixa[]> {
        return this.http
            .get<Faixa[]>(
                `http://localhost:8080/faixa?pesquisa=${pesquisa}`
            )
            .pipe(catchError(this.handleError('list', [])));
    }

    save(record: Faixa): Observable<Faixa[]> {
        return this.http
            .post<Faixa[]>(
                'http://localhost:8080/faixa',
                record
            )
            .pipe(catchError(this.handleError('save', [])));
    }

    delete(record: Faixa): Observable<any> {
        return this.http
            .delete<any>('http://localhost:8080/faixa/' + record.id)
            .pipe(catchError(this.handleError('delete', [])));
    }

}
