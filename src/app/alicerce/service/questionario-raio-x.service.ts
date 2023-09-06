import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { QuestionarioRaioX } from '../model/questionarioraiox';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioRaioXService {

    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError(
            'QuestionarioRaioXService'
        );
    }

    list(pesquisa: string): Observable<QuestionarioRaioX[]> {
        return this.http.get<QuestionarioRaioX[]>(`http://localhost:8080/questionarioraiox?pesquisa=${pesquisa}`)
          .pipe(
            catchError(this.handleError('list', []))
          );
      }

      save(record: QuestionarioRaioX): Observable<QuestionarioRaioX[]> {
        return this.http.post<QuestionarioRaioX[]>("http://localhost:8080/questionarioraiox", record)
          .pipe(
            catchError(this.handleError('save', []))
          );
      }

      delete(record: QuestionarioRaioX): Observable<any> {
        return this.http.delete<any>("http://localhost:8080/questionarioraiox/"+record.id)
          .pipe(
            catchError(this.handleError('delete', []))
          );
      }

}
