import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EnviarArchivoService {

  constructor(private http: HttpClient) { }


  enviarArchivo(archivo: File): Observable<string>{
    let formData:FormData = new FormData();
    formData.append('file', archivo, archivo.name);
    let headers1 = new HttpHeaders();
    headers1.append('Content-Type', 'multipart/form-data');
    headers1.append('Accept', 'application/json');
        
    return this.http.post('http://10.128.3.82:8080/api/v1/uploads/upload',formData,{headers: headers1,observe: 'response', responseType:'text'}).pipe(map(result=>result.body));
  }
}
