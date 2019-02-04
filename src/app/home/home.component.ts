import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthenticationService} from "../shared/helpers/authentication.service";
import {StorageService} from "../shared/helpers/storage.service";
import { FuncionarioService } from '../shared/helpers/funcionario.service';
import { Funcionario } from '../shared/models/funcionario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * HomeComponent
 * Contiene la barra de navegación "side-nav" en la que se acceden a los componentes de Postulantes,
 * Funcionarios, Aptitudes, Configuración, Ayuda, el Perfil del Usuario y Cerrar Sesión
 */
export class HomeComponent{
  private funcionario: Funcionario;
  private url: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    /**
     * Manejo de la Sesión 
     * @param breakpointObserver utilidad que ofrece Material para evaluar consultas y reaccionar a los cambios
     * @param storageService Mantiene la sesión almacenada para que sea persistente
     * @param authenticationService Para hacer el logout
     */

  constructor(private breakpointObserver: BreakpointObserver,
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private funcionarioService: FuncionarioService) { }

    /**
     * Metodo ngOnInit
     * En el metodo ngOnInit, que se carga cada vez que inicia el componente 
     * obtiene los datos del funcionario que inicio sesion y asigna su rol y su id
     * a la sesion 
     */

    ngOnInit(){
      this.funcionarioService.getFuncionario(this.storageService.getCurrentId())
      .subscribe(
        data => {
          this.funcionario=data;
          if(data.rol == 'user1'){
            this.funcionario.nombreRol='Administrador';
          }else if(data.rol == 'user2'){
            this.funcionario.nombreRol='Scrum Master';
          }else{
            this.funcionario.nombreRol='Funcionario';
          }
        }
      );
    }

    /**
     * Realiza un request para cerrar sesión y elimina la sesión
     */
  public logout(): void{
    this.authenticationService.logout().subscribe(
      response => {if(response) {this.storageService.logout();}}
    );
  }
}
