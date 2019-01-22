import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Postulante } from 'src/app/shared/models/postulante';
import { ESTADOS } from 'src/app/shared/models/estados';
import { RecibirPostulanteService } from 'src/app/shared/helpers/recibir-postulante.service';


@Component({
  selector: 'app-listar-postulantes',
  templateUrl: './listar-postulantes.component.html',
  styleUrls: ['./listar-postulantes.component.css']
})
export class ListarPostulantesComponent implements OnInit {
  displayedColumns: string[] = ['foto', 'nombre', 'apellido', 'mail','celular','estado','accion'];
  dataSource: MatTableDataSource<Postulante>;
  lista_Postulantes: Array<Postulante>;
  estados= ESTADOS;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private postulantesService: RecibirPostulanteService){ }
  
  ngOnInit(){
      this.getPostulantes();
      
  }

  getPostulantes(){
      this.postulantesService.getPostulantes().subscribe(data=>this.aux(data.content)); //suscribe
  }

  aux(data){
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
}
