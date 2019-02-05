import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {LoginObject} from "../models/login";
import {USERS} from "../mocks/mock-users";
import { StorageService } from './storage.service';
import { RESPUESTA_POSTULANTES } from '../mocks/mock-response-postulantes';
import { POSTULANTES } from "../mocks/mock-postulantes";
import { RESPUESTA_FUNCIONARIOS } from '../mocks/mock-response-funcionarios';
import { FUNCIONARIOS } from '../mocks/mock-funcionarios';
import { RESPUESTA_FUNCIONARIO } from '../mocks/mock-response-funcionario';

@Injectable(
  {providedIn: 'root'}
  
)
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // fake authenticate api end point
      /* if (request.url.endsWith('/api/v1/auth/login') && request.method === 'POST') {
        let params = request.body;

        // check user credentials and return fake jwt token if valid
        let found: LoginObject = USERS.find((user: LoginObject) => {return (params.email === user.email);});
        if (found) {
          if(params.password === found.password) {
            return of(new HttpResponse({status: 200, body: {
              "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwic2NvcGVzIjoiUk9MRV9BRE1JTiIsImlhdCI6MTU0NzgzMzAxMCwiZXhwIjoxNTUyODgxMDEwfQ.s77XUC5AspF8-3AEITuJaNSrY7zogZ9hNEdj6VQGD-aPcqIQ_3tcfmchiX13LcOZSMbjOCWVJtN_osFuJUqDmA",
              "tokenType": "Bearer"
            }
            }));
          }
        }
          return throwError({code: 1, message: 'Credenciales no validas.'});
        

       } */

      if (request.url.endsWith('/api/v1/auth/logout') && request.method === 'POST') {
        return of(new HttpResponse({status: 200, body: true}));
      }
      
      /*
      //Fake response para listar postulantes con los campos faltantes en el backend
      if(request.url.includes("/api/v1/postulante") && request.method === 'GET' ){
        return of(new HttpResponse({status: 200, body: RESPUESTA_POSTULANTES}));
      }
      
      //Fake response para añadir postulantes con los campos faltantes en el backend
      if(request.url.includes("/api/v1/postulante") && request.method === 'POST' ){
        POSTULANTES.push(request.body);
        return of(new HttpResponse({status: 200, body: request.body}));
      }

      //Fake response para traer un usuario unico con los campos faltantes en el backend
      if(request.url.includes("/api/v1/usuario/1") && request.method === 'GET' ){
        return of(new HttpResponse({status: 200, body: RESPUESTA_FUNCIONARIO}));
      }

      //Fake response para listar usuarios con los campos faltantes en el backend
      if(request.url.includes("/api/v1/usuario") && request.method === 'GET' ){
        return of(new HttpResponse({status: 200, body: RESPUESTA_FUNCIONARIOS}));
      }
      
      

      //Fake response para añadir postulantes con los campos faltantes en el backend
      if(request.url.includes("/api/v1/funcionarios") && request.method === 'POST' ){
        FUNCIONARIOS.push(request.body);
        return of(new HttpResponse({status: 200, body: request.body}));
      }

      */

      if(this.storageService.getCurrentToken()){       
        const req=request.clone({setHeaders:{
          'Authorization' : `Bearer ${this.storageService.getCurrentToken()}`
        }})
        return next.handle(req);
      }

      // pass through any requests not handled above
      return next.handle(request);

    }))

    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};