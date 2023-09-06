import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { Nicho } from '../model/nicho';

@Injectable({
  providedIn: 'root'
})
export class NichoService {

    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError(
            'NichoService'
        );
    }

    list(pesquisa: string): Observable<Nicho[]> {
        return this.http
            .get<Nicho[]>(
                `http://localhost:8080/nicho?pesquisa=${pesquisa}`
            )
            .pipe(catchError(this.handleError('list', [])));
    }

    save(record: Nicho): Observable<Nicho[]> {
        return this.http
            .post<Nicho[]>(
                'http://localhost:8080/nicho',
                record
            )
            .pipe(catchError(this.handleError('save', [])));
    }

    delete(record: Nicho): Observable<any> {
        return this.http
            .delete<any>('http://localhost:8080/nicho/' + record.id)
            .pipe(catchError(this.handleError('delete', [])));
    }

}
