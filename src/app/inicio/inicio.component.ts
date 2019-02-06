import { Component, OnInit } from '@angular/core';
import { ObtenerTituloService } from '../shared/helpers/obtener-titulo.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private tituloService:ObtenerTituloService) { }

  ngOnInit() {
    this.tituloService.asignarTitulo("Home");
  }

}
