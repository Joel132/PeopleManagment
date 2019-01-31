/**
 * Interfaz estado funcionario
 * 
 * Contiene los distintos estados por los que pasa un Funcionario
 * para el filtro de lista de funcionarios.
 */

export interface IEstadoFuncionario {
    value: string;
    viewValue: string;
  }

export const ESTADOS_FUNCIONARIO: Array<IEstadoFuncionario> = [
    {value: 'Activo', viewValue: 'Activo'},
    {value: 'Ex-funcionario', viewValue: 'Ex-Funcionario'}
];