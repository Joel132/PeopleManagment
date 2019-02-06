import { Funcionario } from './../../shared/models/funcionario';
import { Component, OnInit } from '@angular/core';
import { ObtenerTituloService } from 'src/app/shared/helpers/obtener-titulo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/shared/helpers/funcionario.service';
import { ModalComponent } from 'src/app/funcionarios/ver-funcionario/modal/modal.component';
import { MatDialog } from '@angular/material';

/*
*Componente Ver Funcionario
*/

@Component({
  selector: 'app-ver-funcionario',
  templateUrl: './ver-funcionario.component.html',
  styleUrls: ['./ver-funcionario.component.css']
})
export class VerFuncionarioComponent implements OnInit {
  usuario: Funcionario;
  est: string;
  public titulo = 'Ver Funcionario';

  constructor(private usuariosService: FuncionarioService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog,private tituloService: ObtenerTituloService) { }

  /*
  * Pasa los datos de la lista al metodo getFuncionario()
  */

  ngOnInit() {
    this.getFuncionario();
    
    this.tituloService.asignarTitulo(this.titulo);
  }

  /*
  * @param id contiene el identificador del usuario
  * @param usuarios {Funcionario} Datos del Funcionario
  */

  getFuncionario() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuariosService.getFuncionario(id).subscribe(
      data => {
        this.usuario = data;
        if (data.rol == 'user1') {
          this.usuario.nombreRol = 'Administrador';
        } else if (data.rol == 'user2') {
          this.usuario.nombreRol = 'Scrum Master';
        } else {
          this.usuario.nombreRol = 'Funcionario';
        }
        if (data.activo == true) {
          this.usuario.nombre_estado = 'Activo';
        } else {
          this.usuario.nombre_estado = 'Ex-Funcionario';
        }
        if (!data) {
          
        }
      },
      (error)=>{
        //this.openDialog();
        this.router.navigate(['/error']);
      }
      );
    }

    openDialog(): void {  
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '450px',
        data: { est: this.est }
      });
    }

    /*
    * Utiliza el Router para redireccionar a la lista de Funcionarios
    */

    editarFuncionario(id: number){
      this.router.navigate(['/funcionario/editar/' + id]);
    }

  }
