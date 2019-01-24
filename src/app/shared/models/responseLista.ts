import {Postulante} from './postulante';

/**
 * Clase ResponseLista
 * 
 * Contiene la lista de objetos Postulante y la cantidad obtenida del servidor.
 */
export class ResponseLista{
    public content: Postulante[];
    public totalCount: number;
}