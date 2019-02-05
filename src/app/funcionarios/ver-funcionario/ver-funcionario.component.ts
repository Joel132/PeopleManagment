import { Funcionario } from './../../shared/models/funcionario';
import { Component, OnInit } from '@angular/core';
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


  constructor(private usuariosService: FuncionarioService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  /*
  * Pasa los datos de la lista al metodo getFuncionario()
  */

  ngOnInit() {
    if (this.getFuncionario()) {
      this.openDialog();
    }
  }

  /*
  * @param id contiene el identificador del usuario
  * @param usuarios {Funcionario} Datos del Funcionario
  */

  getFuncionario(): boolean {
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
          this.usuario.estado = 'Activo';
        } else {
          this.usuario.estado = 'Ex-Funcionario';
        }
        if (!data) {
          return true;
        }
      });
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
      this.router.navigate(['/usuarios/editar/' + id]);
    }

  }
