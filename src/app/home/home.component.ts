import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthenticationService} from "../shared/helpers/authentication.service";
import {StorageService} from "../shared/helpers/storage.service";
import { Router } from '@angular/router';
import { ObtenerTituloService } from '../shared/helpers/obtener-titulo.service';

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
export class HomeComponent implements OnInit{
  public titulo_componente: string;
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
    private tituloService: ObtenerTituloService){}

  ngOnInit(): void {  }
    /**
     * Realiza un request para cerrar sesión y elimina la sesión
     */
  public logout(): void{
    this.authenticationService.logout().subscribe(
      response => {if(response) {this.storageService.logout();}}
    );
  }
            
 
}
