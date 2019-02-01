import { Component, OnInit } from '@angular/core';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';

@Component({
  selector: 'app-crear-funcionarios',
  templateUrl: './crear-funcionarios.component.html',
  styleUrls: ['./crear-funcionarios.component.css']
})
export class CrearFuncionariosComponent implements OnInit {
  public titulo: string = 'Crear Funcionario';
  constructor(
    private tituloService: ObtenerTituloService ) { }

    ngOnInit() {
      this.tituloService.asignarTitulo(this.titulo);
    }

}
