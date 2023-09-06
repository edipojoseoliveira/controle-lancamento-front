import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Principio } from '../model/principio';

@Injectable({
    providedIn: 'root',
})
export class PrincipioService {

    constructor(private http: HttpClient) {}

    getPrincipios(pesquisa: string): Observable<Principio[]> {
        return this.http.get<Principio[]>(`http://localhost:8080/principio?pesquisa=${pesquisa}`);
    }

    savePrincipio(principio: Principio): Observable<Principio> {
        return this.http.post<Principio>('http://localhost:8080/principio', principio);
    }

    deletePrincipio(principio: Principio): Observable<any> {
        return this.http.delete<any>(`http://localhost:8080/principio/${principio.id}`)
    }

}
