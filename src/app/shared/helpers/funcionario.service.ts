import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../models/Funcionario';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private basePath: string="/api/v1/usuario/";
  constructor(private http:HttpClient) { }

  getFuncionario(id:number){
    return this.http.get<Funcionario>(environment.apiUrl+this.basePath/*+"id?id="*/+id);
  }
}
