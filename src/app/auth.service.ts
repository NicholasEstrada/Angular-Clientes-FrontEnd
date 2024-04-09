import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './login/usuario';
import { Observable, throwError } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + "/auth/register"
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl
  clienteID: string = environment.clienteId;
  clienteSecret: string = environment.clienteSecret
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  obterToken(){
    /*const tokenString =*/return localStorage.getItem('access_token')
    /*if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }else{
      return null;
    }*/
  }

  encerrarSessao(){
    localStorage.removeItem('access_token')
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario
    }
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.obterToken()
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false
  }

  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  /*tentarLogar(username: string, password: string) : Observable<any>{
    const params = new HttpParams()
                    .set('username', username)
                    .set('password', password)
                    .set('grant_type', 'password')


    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clienteID}:${this.clienteSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post( this.tokenURL, params.toString() , { headers })
  }*/
  tentarLogar(username: string, password: string) : Observable<any>{
    const body = {
      username: username,
      password: password
    };

    return this.http.post(this.tokenURL, body).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('access_token', token);
        }
      }),
      switchMap(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
          const headers = {
            'Authorization': 'Bearer ' + token
          };
          // Agora você pode fazer a requisição autenticada com o token JWT
          return this.http.get(this.tokenURL, { headers });
        } else {
          // Tratar o caso em que não há token disponível
          return throwError('Token não encontrado');
        }
      })
    );
  }

}
