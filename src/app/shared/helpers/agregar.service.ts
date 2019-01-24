import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Postulante } from '../models/postulante';
import {environment} from "../../../environments/environment";
@Injectable()

export class AgregarPostulanteService{

    
    private basePath: string="/api/v1/postulante/";

    constructor(private httpClient: HttpClient){}

    agregarPostulante(postulante:Postulante): Observable<Postulante>{

        //llamada al sevicio

        //se retrona un booleano
        return this.httpClient.post<Postulante>(environment.apiUrl+this.basePath,postulante);
    }
    


}