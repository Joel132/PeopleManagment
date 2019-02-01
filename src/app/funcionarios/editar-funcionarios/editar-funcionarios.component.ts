import { Component, OnInit } from '@angular/core';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';

@Component({
  selector: 'app-editar-funcionarios',
  templateUrl: './editar-funcionarios.component.html',
  styleUrls: ['./editar-funcionarios.component.css']
})
export class EditarFuncionariosComponent implements OnInit {
  public titulo: string = 'Editar Funcionario';
  constructor(
    private tituloService: ObtenerTituloService ) { }

    ngOnInit() {
      this.tituloService.asignarTitulo(this.titulo);
    }
}
