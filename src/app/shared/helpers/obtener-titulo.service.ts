import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtenerTituloService {
  public titulo: string;

  constructor() { }

  asignarTitulo(titulo: string){
    this.titulo = titulo;
  }
  
}
