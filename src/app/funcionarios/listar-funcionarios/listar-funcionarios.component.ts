import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Funcionario } from 'src/app/shared/models/funcionario';
import { ESTADOS_FUNCIONARIO } from 'src/app/shared/models/estados_funcionario';
import { RecibirFuncionarioService } from 'src/app/shared/helpers/recibir-funcionario.service';
import { Router } from '@angular/router';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';
import { DialogBajaComponent } from './dialog-baja/dialog-baja.component';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})

export class ListarFuncionariosComponent implements OnInit {
  public titulo: string = 'Lista de Funcionarios';  
  displayedColumns: string[] = ['foto', 'nombre', 'apellido', 'fecha_fin_contrato','celular', 'estado', 'accion'];
  dataSource: MatTableDataSource<Funcionario>;
  lista_funcionarios: Array<Funcionario>;
  estados= ESTADOS_FUNCIONARIO;
  estado: boolean = true;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private FuncionariosService: RecibirFuncionarioService, private router: Router,
    private tituloService: ObtenerTituloService, public dialog: MatDialog){ }
  
  ngOnInit(){
    this.tituloService.asignarTitulo(this.titulo);  
    this.getFuncionarios();
  }
  
  /**
   * Realiza un request de la lista de funcionarios y espera que el servidor responda.
   * De un ResponseLista recibe la lista de los funcionarios almacenados en servidor.
   * Llama a la función aux enviando como contenido la lista.
   */
  getFuncionarios(){
      this.FuncionariosService.getFuncionarios().subscribe(data=>this.aux(data.content),error=>this.router.navigate(['/error'])); //suscribe
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
      if(data.activo === true){
        data.nombre_estado= 'Activo';
      }else{
        data.nombre_estado= 'Ex-Funcionario';
      }
    })

      this.dataSource=new MatTableDataSource(lista_funcionarios);
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

  onClickFuncionario(){
    this.router.navigate(['/']);
  }  
  openModalBaja(): void{
    const dialogRef = this.dialog.open(DialogBajaComponent, {
      width: '450px',
      data: {estado: this.estado}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.estado = result;
    });
  }
}

