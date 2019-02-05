import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Postulante } from 'src/app/shared/models/postulante';
import { ESTADOS } from 'src/app/shared/models/estados';
import { RecibirPostulanteService } from 'src/app/shared/helpers/recibir-postulante.service';
/**
 * Componente Listar Postulante
 */
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-postulantes',
  templateUrl: './listar-postulantes.component.html',
  styleUrls: ['./listar-postulantes.component.css']
})

export class ListarPostulantesComponent implements OnInit {
  estadosPostulante: string[]=['Desafio Pendiente','Desafio Recibido','Desafio Revisado','Entrevista Administrador','Entrevista SM','Entrevista Team','Aprobado','Rechazado'];
  displayedColumns: string[] = ['foto', 'nombre', 'apellido', 'mail','celular','estado','accion'];
  dataSource: MatTableDataSource<Postulante>;
  lista_Postulantes: Array<Postulante>;
  estados= ESTADOS;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private postulantesService: RecibirPostulanteService, 
              private router: Router){ }
  
  ngOnInit(){
      this.getPostulantes();
      
  }
  
  /**
   * Realiza un request de la lista de postulantes y espera que el servidor responda.
   * De un ResponseLista recibe la lista de los postulantes almacenados en servidor.
   * Llama a la función aux enviando como contenido la lista.
   */
  getPostulantes(){
      this.postulantesService.getPostulantes().subscribe(data=>this.aux(data.content)); //suscribe
  }
  
  /**
   * Crea la matriz de datos de el arreglo recibido en lista_postulantes.
   * Se realiza la paginación y la ordenación de los datos.
   * @param lista_postulantes {any} La lista de objetos Postulante
   */
  aux(lista_postulantes: any){
      this.dataSource=new MatTableDataSource(lista_postulantes);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
  }

  /**
   * Recibe filterValue y asigna a la propiedad filter del dataSource, que selecciona los elementos en común
   * @param filterValue {string} Valor del estado por el que se desea filtrar
   */
  applyFilter(filterValue: string) {
    if(filterValue){
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }else{
        this.dataSource.filter= "";
    }
  }

  onclickPostulante(){
    this.router.navigate(['/']);
  }
}
