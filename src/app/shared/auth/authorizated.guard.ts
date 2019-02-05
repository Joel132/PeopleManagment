import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {StorageService} from "../helpers/storage.service";

/**
 * Guard de Autorización
 */

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
    private storageService: StorageService) { }

/**
 * Permite el acceso al Scrum Master y al Adminitrador a ciertas rutas.
 */
canActivate() {

    // logeado entonces devuelve true 
    if (this.storageService.isAuthenticated() ) {
      return true;
    }

    // no está logeado entonces redirige a la pagina del login y devuelve false
      else if(!this.storageService.isAuthenticated()){
      this.router.navigate(['/login']);
      return false;
    }
  }

  /**
   * Permite el acceso al Scrum Master y al Adminitrador a ciertas rutas hijas.
   */
  canActivateChild(){
    // logeado y es administrador o scrum master entonces devuelve true 
    console.log("Esta autenticado: ", this.storageService.isAuthenticated());
    console.log("Su rol es: ", this.storageService.getCurrentRol())
    if (this.storageService.isAuthenticated() && (this.storageService.getCurrentRol() == 'user1' || this.storageService.getCurrentRol() == 'user2')) {
      
      return true;
    }else{
        this.router.navigate(['/']);
        return false;
    }
  }
}
