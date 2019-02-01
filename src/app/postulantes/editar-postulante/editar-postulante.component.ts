import { Component, OnInit } from '@angular/core';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';

@Component({
  selector: 'app-editar-postulante',
  templateUrl: './editar-postulante.component.html',
  styleUrls: ['./editar-postulante.component.css']
})
export class EditarPostulanteComponent implements OnInit {
  public titulo: string = 'Editar Postulante';
  constructor(
    private tituloService: ObtenerTituloService ) { }

    ngOnInit() {
      this.tituloService.asignarTitulo(this.titulo);
    }

}
