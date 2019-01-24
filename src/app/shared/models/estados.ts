/**
 * Interfaz estado
 * 
 * Contiene los distintos estados por los que pasa un postulante
 * para el filtro de lista de postulantes.
 */

export interface IEstado {
    value: string;
    viewValue: string;
  }

export const ESTADOS: Array<IEstado> = [
    {value: 'Rechazado', viewValue: 'Rechazado'},
    {value: 'Pendiente Desafio', viewValue: 'Desafío Pendiente'},
    {value: 'Desafío Revisado', viewValue: 'Desafío Revisado'},
    {value: 'Pendiente E. SM', viewValue: 'Entrevista SM'},
    {value: 'Pendiente E. Admin', viewValue: 'Entrevista Administrador'},
    {value: 'Pendiente E. Team', viewValue: 'Entrevista Team'},
    {value: 'Aprobado', viewValue: 'Aprobado'}
];