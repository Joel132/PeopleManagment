import { Component, OnInit } from '@angular/core';
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

  constructor(private postulantesService: RecibirPostulanteService, 
    private route: ActivatedRoute, private router: Router){ }

  ngOnInit() {
    this.getPostulante();
  }

  getPostulante(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.postulantesService.getPostulante(id).subscribe(data => {this.postulante = data});
  }

  editarPostulante(id: number){
    this.router.navigate(['postulantes/editar/'+id]);
  }
}
