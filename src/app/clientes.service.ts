import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { dominioClass } from './servico-prestado/dominioClass';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase;

  constructor( private http: HttpClient) { }

  salvar( cliente: Cliente ) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiURL}`, cliente)
  }

  atualizar( cliente: Cliente ) : Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente)
  }

  getDominios() : Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${"inventor/dominios"}`);
  }

  getClienteById(id: number) : Observable<Cliente>{
    console.log("APIURL:"+this.apiURL+" |ID:"+id)
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(cliente: Cliente) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }

  getDadosSensiveisPorDominio(id: number) : Observable<any>{
    return this.http.get<any>(`${this.apiURL}/${"inventor/dadosSensiveisDomain?dominioId="}${id}`);
  }
}
