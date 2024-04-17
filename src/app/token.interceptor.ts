import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtenha o token de autenticação do armazenamento local ou de qualquer outro local onde você o armazenou
    const authToken = localStorage.getItem('access_token');
    console.log('Interceptor called' + authToken);

    // Clone a solicitação e adicione o token de autenticação ao cabeçalho Authorization
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    // Envie a solicitação modificada para o próximo manipulador
    return next.handle(request);
  }
}
