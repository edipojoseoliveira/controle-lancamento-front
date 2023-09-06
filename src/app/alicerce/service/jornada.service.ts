import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import {
    HandleError,
    HttpErrorHandler,
} from 'src/app/http-error-handler.service';
import { Jornada } from '../model/jornada';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class JornadaService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('JornadaService');
    }

    getJornadas(pesquisa: string): Observable<Jornada[]> {
        return this.http
            .get<Jornada[]>(
                `http://localhost:8080/jornada?pesquisa=${pesquisa}`
            )
            .pipe(catchError(this.handleError('getJornadas', [])));
    }

    saveJornada(jornada: Jornada): Observable<Jornada[]> {
        return this.http
            .post<Jornada[]>('http://localhost:8080/jornada', jornada)
            .pipe(catchError(this.handleError('saveJornada', [])));
    }

    deleteJornada(jornada: Jornada): Observable<any> {
        return this.http
            .delete<any>('http://localhost:8080/jornada/' + jornada.id)
            .pipe(catchError(this.handleError('deleteJornada', [])));
    }
}
