import { Injectable } from '@angular/core';
import { Postulante } from '../models/postulante';
import { ResponseLista } from '../models/responseLista';
import { Observable, of } from 'rxjs';
import {environment} from "../../../environments/environment";
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecibirPostulanteService {
  private basePath: string="/api/v1/postulante/";
  private url: string="http://10.128.3.82:8080";
  
  constructor(private httpClient: HttpClient) { }

  


  getPostulantes(): Observable<ResponseLista> {
    let params=new HttpParams();
    params=params.append('size','1000'); // Se recibe siempre el total de la lista para trabajar localmente
    params=params.append('page','0');
    return this.httpClient.get<ResponseLista>(environment.apiUrl+this.basePath,{params});
  }

  getPostulante(id: number): Observable<Postulante>{
    return this.httpClient.get<Postulante>(this.url+"/api/v1/postulantes/"+id);
  }
}
