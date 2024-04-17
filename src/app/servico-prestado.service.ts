import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dadoSensiveis } from './servico-prestado/dadoSensiveis';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + "/dadosSensiveis"

  constructor(private http: HttpClient) { }

  salvar(servicoPrestado: dadoSensiveis) :Observable<dadoSensiveis>{
    return this.http.post<dadoSensiveis>(this.apiURL, servicoPrestado);
  }

  buscar(nome: string, mes: number) : Observable<ServicoPrestadoBusca[]> {

    const httpParams = new HttpParams()
                        .set("nome", nome)
                        .set("mes", mes ? mes.toString() : '');

    const url = this.apiURL + "?" + httpParams.toString()
    return this.http.get<any>(url);
  }
}
