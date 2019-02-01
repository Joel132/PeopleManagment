import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AgregarPostulanteService } from '../../shared/helpers/agregar.service';
import { Postulante } from 'src/app/shared/models/postulante';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';
/**
 * Componente Crear Postulante.
 */

@Component({
  selector: 'app-crear-postulante',
  templateUrl: './crear-postulante.component.html',
  styleUrls: ['./crear-postulante.component.css']
})

export class CrearPostulanteComponent implements OnInit {
  public titulo: string = 'Crear Postulante';
  constructor(private servicioAgregar: AgregarPostulanteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private tituloService: ObtenerTituloService ) { }

  ngOnInit() {
    this.tituloService.asignarTitulo(this.titulo);
  }

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

  /**
   * Pasa los valores del formulario al método agregarPostulante
   */
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.servicioAgregar.agregarPostulante(this.formPostulantes.value).subscribe(data => this.recibidoCorrectamente(data),error=>this.errorRecibido(error));
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
}
