/**
 * Clase Postulante
 * 
 * Define la estructura postulante del servidor.
 */

export class Postulante {
    constructor(
        public apellido: string,
        public celular: string,
        public comentarioGral: string,
        public curriculumUrl: string,
        public desafioUrl: string,
        public documento: string,
        public id: number,
        public mail: string,
        public nombre: string,
        public estado: string,
        // Estos no estan en el JSON
        public foto: string,
        public comentarioDesafio: string,
        public comentarioAdmin: string,
        public comentarioSM: string,
        public comentarioTeam: string
        
    ) {}
}

