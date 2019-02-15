import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Postulante } from 'src/app/shared/models/postulante';
import { ESTADOS } from 'src/app/shared/models/estados';
import { RecibirPostulanteService } from 'src/app/shared/helpers/recibir-postulante.service';
/**
 * Componente Listar Postulante
 */
import { Router } from '@angular/router';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';

@Component({
  selector: 'app-listar-postulantes',
  templateUrl: './listar-postulantes.component.html',
  styleUrls: ['./listar-postulantes.component.css']
})

export class ListarPostulantesComponent implements OnInit {
  public titulo: string = 'Lista de Postulantes';
  estadosPostulante: string[]=['Desafio Pendiente','Desafio Recibido','Desafio Revisado','Entrevista Administrador','Entrevista SM','Entrevista Team','Aprobado','Rechazado'];
  displayedColumns: string[] = ['foto', 'nombre', 'apellido', 'mail','celular','estado','accion'];
  dataSource: MatTableDataSource<Postulante>;
  lista_Postulantes: Array<Postulante>;
  estados= ESTADOS;
  totalPostulantes: number;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private postulantesService: RecibirPostulanteService, 
    private router: Router,
    private tituloService: ObtenerTituloService
    ){ 

  }
  
  ngOnInit(){
      this.getPostulantes();
      this.tituloService.asignarTitulo(this.titulo); 
  }
  
  /**
   * Realiza un request de la lista de postulantes y espera que el servidor responda.
   * De un ResponseLista recibe la lista de los postulantes almacenados en servidor.
   * Llama a la función aux enviando como contenido la lista.
   */
  getPostulantes(){
      this.postulantesService.getPostulantes().subscribe(data=>this.aux(data),error=>this.router.navigate(['/error'])); //suscribe
  }
  
  /**
   * Crea la matriz de datos de el arreglo recibido en lista_postulantes.
   * Se realiza la paginación y la ordenación de los datos.
   * @param lista_postulantes {any} La lista de objetos Postulante
   */
  aux(lista_postulantes: any){
      this.dataSource=new MatTableDataSource(lista_postulantes.content);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
      this.totalPostulantes = lista_postulantes.totalPostulantes;
      
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

  onclickAgregar(){
    this.router.navigate(['/postulante/crear']);
  }

}
