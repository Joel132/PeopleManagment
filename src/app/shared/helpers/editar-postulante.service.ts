import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Postulante } from '../models/postulante';
@Injectable()

export class EditarPostulanteService{

    
    private url: string="http://10.128.3.82:8080/api/v1/postulante/";

    constructor(private httpClient: HttpClient){}

    editarPostulante(postulante:Postulante): Observable<Postulante>{

        //llamada al sevicio

        //se retrona un booleano
        return this.httpClient.put<Postulante>(this.url+postulante.id,postulante);
    }
    


}