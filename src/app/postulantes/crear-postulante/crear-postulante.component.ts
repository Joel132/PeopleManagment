import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgregarPostulanteService } from '../../shared/helpers/agregar.service';
import { Postulante } from 'src/app/shared/models/postulante';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
/**
 * Componente Crear Postulante.
 */

@Component({
  selector: 'app-crear-postulante',
  templateUrl: './crear-postulante.component.html',
  styleUrls: ['./crear-postulante.component.css']
})

export class CrearPostulanteComponent implements OnInit {
  
  formCrearPostulantes: FormGroup;
  url = '';

  constructor(private servicioAgregar: AgregarPostulanteService,
              private snackBar: MatSnackBar,
              private router: Router ) { }

  ngOnInit() {
    this.formCrearPostulantes = new FormGroup({
      id: new FormControl(0),
      nombre : new FormControl('', [Validators.required,Validators.pattern('[/a-zA-Z ]*')]), //solo letras, requerido
      apellido : new FormControl('', [Validators.required,Validators.pattern('[/a-zA-Z ]*')] ), //solo letras, requerido
      documento : new FormControl('', [Validators.maxLength(7)]), //, hasta 7 cifras
      celular : new FormControl(),
      fecha_nac : new FormControl(),
      mail : new FormControl('', [Validators.required, Validators.email]), //direccion valida, requerido
      direccion : new FormControl('', Validators.maxLength(20)), //hasta 20 letras
      estado : new FormControl(),
      genero : new FormControl(),
      desafioUrl: new FormControl(),
      curriculumUrl: new FormControl(),
      comentario: new FormControl()
    });
  }
  /**
   * Pasa los valores del formulario al método agregarPostulante
   */
  onSubmit() {
    console.log(this.formCrearPostulantes.value);
    this.servicioAgregar.agregarPostulante(this.formCrearPostulantes.value).subscribe(data => this.recibidoCorrectamente(data),error=>this.errorRecibido(error));
  }

  /**
   * Utiliza un SnackBar para informar al usuario que creó correctamente un postulante
   * @param data {Postulante} Datos del postulante
   */
  recibidoCorrectamente(data: Postulante){
    console.log("Creado "+data);
    //this.formCrearPostulantes.reset();
    this.openSnackBar("Postulante creado exitosamente","Entendido");
  }

  /**
   * Genera el SnackBar con el mensaje recibido como parámetro y redirecciona a la lista de postulantes
   * @param message {string} Mensaje de éxito
   * @param action {string} Acción utilizada: cerrar
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });

    //se vuelve al listado de postulantes
    this.volverAlListado();
  }

 /**
  * Mensaje de error
  * @param error 
  */
  errorRecibido(error){

  }

 /**
  * Utiliza el Router para redireccionar a la lista de postulantes
  */
  volverAlListado(){
    this.router.navigate(['/postulante']);
  }
  
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }  

  delete(){
    this.url = null;
  }

}//fin de la clase
