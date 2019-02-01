import {Funcionario} from './funcionario';

/**
 * Clase ResponseLista
 * 
 * Contiene la lista de objetos Funcionarios y la cantidad obtenida del servidor.
 */
export class ResponseLista{
    public content: Funcionario[];
    public totalCount: number;
}