export class Postulante {
    constructor(
        public apellido: string,
        public celular: string,
        public comentario: string,
        public curriculumUrl: string,
        public desafioUrl: string,
        public documento: string,
        public id: number,
        public mail: string,
        public nombre: string,
        // Estos no estan en el JSON
        public foto: string,
        public estado: string
    ) {}
}

