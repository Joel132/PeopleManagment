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
        public documento:string,    
        public genero: string,
        public beneficiario:string,
        public email: string, 
        public direccion: string,   
        public celular: string,
        public fechaInicio:string,
        public fechaVencimiento:string,
        public fechaDeNacimiento: string,
        public usuario:string,
        public clave:string,
        public confirmarContraseña: string,
        public rol:string,
        public curriculum:string,
        public activo:boolean,
        public nombre_estado: string,
        public nombreRol:string,
        public curriculumUrl:string,
        public desafioUrl: string
    ) {}
}

