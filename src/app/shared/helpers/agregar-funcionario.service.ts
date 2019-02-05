import { Funcionario } from './../models/funcionario';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
@Injectable()

export class AgregarFuncionarioService{

    
    private basePath: string="/api/v1/usuarios/";

    constructor(private httpClient: HttpClient){}

    agregarFuncionario(funcionario:Funcionario): Observable<Funcionario>{

        //llamada al sevicio

        //se retrona un booleano
        return this.httpClient.post<Funcionario>(environment.apiUrl+this.basePath,funcionario);
    }
    


}