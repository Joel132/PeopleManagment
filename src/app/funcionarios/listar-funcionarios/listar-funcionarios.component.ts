import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Funcionario } from 'src/app/shared/models/funcionario';
import { ESTADOS_FUNCIONARIO } from 'src/app/shared/models/estados_funcionario';
import { RecibirFuncionarioService } from 'src/app/shared/helpers/recibir-funcionario.service';
import { Router } from '@angular/router';

//import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout"
/**
 * Componente Listar Funcionario
*/

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})

export class ListarFuncionariosComponent implements OnInit {
  displayedColumns: string[] = ['foto', 'nombre', 'apellido', 'fecha_fin_contrato','celular', 'estado', 'accion'];
  dataSource: MatTableDataSource<Funcionario>;
  lista_funcionarios: Array<Funcionario>;
  estados= ESTADOS_FUNCIONARIO;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private FuncionariosService: RecibirFuncionarioService, private router: Router,
    /* private breakPoint: BreakpointObserver*/){ }
  
  ngOnInit(){
      this.getFuncionarios();
      //Para emitir valores una vez que el width cambie para mobile. Ver documentacion de Material Design
      
  }
  
  /**
   * Realiza un request de la lista de funcionarios y espera que el servidor responda.
   * De un ResponseLista recibe la lista de los funcionarios almacenados en servidor.
   * Llama a la función aux enviando como contenido la lista.
   */
  getFuncionarios(){
      this.FuncionariosService.getFuncionarios().subscribe(data=>this.aux(data.content)); //suscribe
  }
  
  /**
   * Crea la matriz de datos de el arreglo recibido en lista_funcionarios.
   * Se realiza la paginación y la ordenación de los datos.
   * @param lista_funcionarios {any} La lista de objetos funcionario
   */
  aux(lista_funcionarios: Funcionario[]){
    lista_funcionarios.map(data=>{
      data.celular="0982312";
      data.fechaVencimiento= "23/03/19";
      if(data.estado){
        data.nombre_estado= 'Activo';
      }else{
        data.nombre_estado= 'Ex-Funcionario';
      }
    })
      this.dataSource=new MatTableDataSource(lista_funcionarios);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort= this.sort;
      
      /*  No es necesario, se utilizará el fxHide para no modificar la estructura.
      this.breakPoint.observe([Breakpoints.Handset]).subscribe(result=>{
        //Si coincide las especificaciones de Handset(Tamaño telefono) entonces ejecutar una accion
        if(result.matches){
          this.mobile();
        }
        //Sino ejecutar otra odesktopion
        else{
          this.desktop();
        }
      }); 
      */
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

  onclickfuncionario(){
    this.router.navigate(['/']);
  }
  /*
    mobile(){
      this.displayedColumns=['foto', 'nombre', 'apellido', 'accion'];
    }

    desktop(){
      this.displayedColumns=['foto', 'nombre', 'apellido', 'fecha_fin_contrato','celular', 'estado', 'accion'];
    }
  */
}
