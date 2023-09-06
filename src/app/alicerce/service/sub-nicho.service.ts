import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { SubNicho } from '../model/subnicho';

@Injectable({
  providedIn: 'root'
})
export class SubNichoService {

    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError(
            'NichoService'
        );
    }

    list(pesquisa: string): Observable<SubNicho[]> {
        return this.http
            .get<SubNicho[]>(
                `http://localhost:8080/subnicho?pesquisa=${pesquisa}`
            )
            .pipe(catchError(this.handleError('list', [])));
    }

    save(record: SubNicho): Observable<SubNicho[]> {
        return this.http
            .post<SubNicho[]>(
                'http://localhost:8080/subnicho',
                record
            )
            .pipe(catchError(this.handleError('save', [])));
    }

    delete(record: SubNicho): Observable<any> {
        return this.http
            .delete<any>('http://localhost:8080/subnicho/' + record.id)
            .pipe(catchError(this.handleError('delete', [])));
    }

}
