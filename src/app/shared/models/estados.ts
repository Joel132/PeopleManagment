export interface IEstado {
    value: string;
    viewValue: string;
  }

export const ESTADOS: Array<IEstado> = [
    {value: 'Rechazado', viewValue: 'Rechazado'},
    {value: 'Desafío Pendiente', viewValue: 'Desafío Pendiente'},
    {value: 'Desafío Revisado', viewValue: 'Desafío Revisado'},
    {value: 'Entrevista SM', viewValue: 'Entrevista SM'},
    {value: 'Entrevista Administrador', viewValue: 'Entrevista Administrador'},
    {value: 'Entrevista Team', viewValue: 'Entrevista Team'},
    {value: 'Aprobado', viewValue: 'Aprobado'}
];