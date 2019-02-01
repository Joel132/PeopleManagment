import { Component, OnInit } from '@angular/core';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';

@Component({
  selector: 'app-ver-funcionario',
  templateUrl: './ver-funcionario.component.html',
  styleUrls: ['./ver-funcionario.component.css']
})
export class VerFuncionarioComponent implements OnInit {
  public titulo = 'Ver Funcionario';
  constructor(
    private tituloService: ObtenerTituloService ) { }

    ngOnInit() {
      this.tituloService.asignarTitulo(this.titulo);
    }
}
