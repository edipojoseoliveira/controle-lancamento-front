import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { TipoLancamento } from '../model/tipolancamento';

@Injectable({
    providedIn: 'root',
})
export class TipoLancamentoService {

    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError(
            'TipoLancamentoService'
        );
    }

    list(pesquisa: string): Observable<TipoLancamento[]> {
        return this.http.get<TipoLancamento[]>(`http://localhost:8080/tipolancamento?pesquisa=${pesquisa}`)
          .pipe(
            catchError(this.handleError('list', []))
          );
      }

      save(record: TipoLancamento): Observable<TipoLancamento[]> {
        return this.http.post<TipoLancamento[]>("http://localhost:8080/tipolancamento", record)
          .pipe(
            catchError(this.handleError('save', []))
          );
      }

      delete(record: TipoLancamento): Observable<any> {
        return this.http.delete<any>("http://localhost:8080/tipolancamento/"+record.id)
          .pipe(
            catchError(this.handleError('delete', []))
          );
      }

}
