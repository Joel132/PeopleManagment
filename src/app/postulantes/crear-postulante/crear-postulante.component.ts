import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AgregarPostulanteService } from '../../shared/helpers/agregar.service';

@Component({
  selector: 'app-crear-postulante',
  templateUrl: './crear-postulante.component.html',
  styleUrls: ['./crear-postulante.component.css']
})
export class CrearPostulanteComponent implements OnInit {

  constructor(private servicioAgregar: AgregarPostulanteService ) { }

  ngOnInit() {

    console.log("hola");
  }

  formPostulantes = new FormGroup({
    nombre : new FormControl(),
    apellido : new FormControl(),
    cedula : new FormControl(),
    telefono : new FormControl(),
    fecha_nac : new FormControl(),
    correo : new FormControl(),
    direccion : new FormControl(),
    estado : new FormControl()
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formPostulantes.value);
  }


}
