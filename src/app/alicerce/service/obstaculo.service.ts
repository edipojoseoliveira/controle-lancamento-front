import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obstaculo } from '../model/obstaculo';

@Injectable({
    providedIn: 'root',
})
export class ObstaculoService {

    constructor(private http: HttpClient) {}

    getObstaculos(pesquisa: string): Observable<Obstaculo[]> {
        return this.http.get<Obstaculo[]>(`http://localhost:8080/obstaculo?pesquisa=${pesquisa}`);
    }

    saveObstaculo(obstaculo: Obstaculo): Observable<Obstaculo> {
        return this.http.post<Obstaculo>('http://localhost:8080/obstaculo', obstaculo);
    }

    deleteObstaculo(obstaculo: Obstaculo): Observable<any> {
        return this.http.delete<any>(`http://localhost:8080/obstaculo/${obstaculo.id}`)
    }

}
