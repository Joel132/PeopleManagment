import { Funcionario } from './../models/funcionario';
import { Injectable } from '@angular/core';
import { ResponseLista } from '../models/responseListaFuncionario';
import { Observable, of } from 'rxjs';
import {environment} from "../../../environments/environment";
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecibirFuncionarioService {
  private basePath: string="/api/v1/usuarios/";
  constructor(private httpClient: HttpClient) { }

  getFuncionarios(): Observable<ResponseLista> {
    let params=new HttpParams();
    params=params.append('size','1000'); // Se recibe siempre el total de la lista para trabajar localmente
    params=params.append('page','0');
    return this.httpClient.get<ResponseLista>(environment.apiUrl+this.basePath,{params});
  }

  getFuncionario(id: number){
    return this.httpClient.get<Funcionario>(environment.apiUrl+this.basePath+id);
  }

}