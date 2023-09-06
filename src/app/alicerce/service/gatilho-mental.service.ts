import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';
import { GatilhoMental } from '../model/gatilhomental';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GatilhoMentalService {

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('GatilhoMentalService');
  }

  getGatilhosMentais(pesquisa: string): Observable<GatilhoMental[]> {
    return this.http.get<GatilhoMental[]>(`http://localhost:8080/gatilhomental?pesquisa=${pesquisa}`)
      .pipe(
        catchError(this.handleError('getGatilhosMentais', []))
      );
  }

  saveGatilhoMental(gatilhoMental: GatilhoMental): Observable<GatilhoMental[]> {
    return this.http.post<GatilhoMental[]>("http://localhost:8080/gatilhomental", gatilhoMental)
      .pipe(
        catchError(this.handleError('saveGatilhoMental', []))
      );
  }

  deleteGatilhoMental(gatilhoMental: GatilhoMental): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/gatilhomental/"+gatilhoMental.id)
      .pipe(
        catchError(this.handleError('deleteGatilhoMental', []))
      );
  }

}
