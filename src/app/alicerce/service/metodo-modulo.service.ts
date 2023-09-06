import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { MetodoModulo } from '../model/metodomodulo';

@Injectable({
  providedIn: 'root'
})
export class MetodoModuloService {

    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError(
            'MetodoModuloService'
        );
    }

    list(idMetodo?: any, idMetodoModuloPai?: any): Observable<MetodoModulo[]> {
        return this.http
            .get<MetodoModulo[]>(
                `http://localhost:8080/metodomodulo?idMetodo=${idMetodo}&idMetodoModuloPai=${idMetodoModuloPai}`
            )
            .pipe(catchError(this.handleError('list', [])));
    }

    save(record: MetodoModulo): Observable<MetodoModulo[]> {
        return this.http
            .post<MetodoModulo[]>(
                'http://localhost:8080/metodomodulo',
                record
            )
            .pipe(catchError(this.handleError('save', [])));
    }

    delete(record: MetodoModulo): Observable<any> {
        return this.http
            .delete<any>('http://localhost:8080/metodomodulo/' + record.id)
            .pipe(catchError(this.handleError('delete', [])));
    }

}
