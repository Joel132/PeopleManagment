import { Component, OnInit } from '@angular/core';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';

@Component({
  selector: 'app-ver-postulante',
  templateUrl: './ver-postulante.component.html',
  styleUrls: ['./ver-postulante.component.css']
})
export class VerPostulanteComponent implements OnInit {
  public titulo: string = 'Ver Postulante';
  constructor(
    private tituloService: ObtenerTituloService
  ) { }

  ngOnInit() {
    this.tituloService.asignarTitulo(this.titulo);
  }

}
