/**
 * Clase Funcionario
 * 
 * Define la estructura de un funcionario en el servidor.
 */

export class Funcionario {
    constructor(
        public idUsuario: number,
        public foto:string,
        public nombre:string,
        public apellido:string,    
        public ci:string,    
        public beneficiario:string,
        public email: string,    
        public celular: string,
        public fechaInicio:string,
        public fechaVencimiento:string,
        public usuario:string,
        public contraseña:string,
        public rol:string,
        public curriculum:string,
        public activo:boolean,
        public nombre_estado: string
    ) {}
}

