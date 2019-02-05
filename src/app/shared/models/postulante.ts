/**
 * Clase Postulante
 * 
 * Define la estructura postulante del servidor.
 */

export class Postulante {
    constructor(
        public apellido: string,
        public celular: string,
        public comentario: string,
        public comentarioAdmin: string,
        public comentarioDesafio: string,
        public comentarioTeam: string,
        public curriculumUrl: string,
        public desafioUrl: string,
        public documento: string,
        public id: number,
        public mail: string,
        public nombre: string,
        public estado: string,
        public direccion: string,
        // Estos no estan en el JSON
        public foto: string,
        public comentarioSm: string,
        public fechaDeNacimiento: string,
        public genero: string
    ) {}
}

