import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
@Injectable()

export class AgregarPostulanteService{

    
    valor: boolean;

    constructor(){}

    agregarPostulante(){

        //llamada al sevicio

        //se retrona un booleano
        return of(this.valor);
    }
    


}