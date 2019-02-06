import { Component, OnInit } from '@angular/core';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';
import { RecibirPostulanteService } from 'src/app/shared/helpers/recibir-postulante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Postulante } from 'src/app/shared/models/postulante';
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-ver-postulante',
  templateUrl: './ver-postulante.component.html',
  styleUrls: ['./ver-postulante.component.scss']
})


export class VerPostulanteComponent implements OnInit {
  postulante: Postulante;
  estado : string[] = ['Desafío Pendiente','Desafío Recibido', 'Desafío Revisado', 'Entrevista Administrador', 'Entrevista SM', 'Entrevista Team','Aprobado', 'Rechazado'];  
  public titulo: string = 'Ver Postulante';
  constructor(private postulantesService: RecibirPostulanteService, 
    private route: ActivatedRoute, private router: Router,private tituloService: ObtenerTituloService){ }

  ngOnInit() {
    this.getPostulante();
    this.tituloService.asignarTitulo(this.titulo);
  }

  getPostulante(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.postulantesService.getPostulante(id).subscribe(data => {this.postulante = data},
      error=>this.router.navigate(['/error']));
  }

  editarPostulante(id: number){
    this.router.navigate(['postulante/editar/'+id]);
  }
}
