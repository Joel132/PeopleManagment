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

  formPostulantes = new FormGroup({
    id: new FormControl(0),
    nombre : new FormControl(),
    apellido : new FormControl(),
    documento : new FormControl(),
    celular : new FormControl(),
    fecha_nac : new FormControl(),
    mail : new FormControl(),
    direccion : new FormControl(),
    estado : new FormControl(),
    desafioUrl: new FormControl(),
    curriculumUrl: new FormControl(),
    comentario: new FormControl()
  });

  
  constructor(private servicioAgregar: AgregarPostulanteService,private snackBar: MatSnackBar,private router: Router ) { }

  ngOnInit() {

  }
  /**
   * Pasa los valores del formulario al método agregarPostulante
   */
  onSubmit() {
    this.validarFormulario();
    //this.servicioAgregar.agregarPostulante(this.formPostulantes.value).subscribe(data => this.recibidoCorrectamente(data),error=>this.errorRecibido(error));
  }

  /**
   * Utiliza un SnackBar para informar al usuario que creó correctamente un postulante
   * @param data {Postulante} Datos del postulante
   */
  recibidoCorrectamente(data: Postulante){
    console.log("Creado "+data);
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

  validarFormulario(){

    let mensaje: String;
    let nombre = this.formPostulantes.get('nombre') as FormControl;
    let apellido = this.formPostulantes.get('apellido') as FormControl;
    let celular = this.formPostulantes.get('celular') as FormControl;
    
   //se valida el campo nombre
   if(/\d/.test(nombre.value)){
     console.log("nombre invalido");
     mensaje = "Nombre no valido";
    }
    
    //se valida el campo nombre
    if(/\d/.test(apellido.value)){
      console.log("apellido invalido");
      mensaje = "Apellido no valido";
   }
   
   //se valida el campo celular
   if(/^[0-9]+$/.test(apellido.value)){
     console.log("celular invalido");
     mensaje = "Celular no valido";
  }


    

  } 

}//fin de la clase
