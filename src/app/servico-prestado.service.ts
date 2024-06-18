import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dadoSensiveis } from './servico-prestado/dadoSensiveis';
import { Observable, interval } from 'rxjs';
import { environment } from '../environments/environment'
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + "/inventor"

  constructor(private http: HttpClient) { }

  salvar(requestBody: any): Observable<any> {
    return this.http.post<any>(this.apiURL+"/buscaPorDominio", requestBody);
  }


  buscar(requestBody: any): Observable<any> {
    return this.http.post<any>(this.apiURL+"/buscaPorDominio", requestBody);
  }

  getTaskStatus(): Observable<number> {
    return interval(1000).pipe(
      switchMap(() => this.http.get<number>(`${this.apiURL}/task/status`))
    );
  }
}
