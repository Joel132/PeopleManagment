import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AgregarPostulanteService } from '../../shared/helpers/agregar.service';
import { Postulante } from 'src/app/shared/models/postulante';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-postulante',
  templateUrl: './crear-postulante.component.html',
  styleUrls: ['./crear-postulante.component.css']
})
export class CrearPostulanteComponent implements OnInit {

  constructor(private servicioAgregar: AgregarPostulanteService,private snackBar: MatSnackBar,private router: Router ) { }

  ngOnInit() {

    
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.servicioAgregar.agregarPostulante(this.formPostulantes.value).subscribe(data => this.recibidoCorrectamente(data),error=>this.errorRecibido(error));
  }

  recibidoCorrectamente(data: Postulante){
    console.log("Creado "+data);
    //this.formPostulantes.reset();
    this.openSnackBar("Postulante creado exitosamente","Entendido");

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
    this.volverAlListado();
  }

  errorRecibido(error){

  }

  volverAlListado(){
    this.router.navigate(['/postulante']);
  }
}
