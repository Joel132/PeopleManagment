import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from "../helpers/storage.service";
import {Router} from "@angular/router";
 
/**
 * Evita que se ingrese al sistema si no se realiza la autenticación
 */
@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {
  
  constructor(private router: Router,
    private storageService: StorageService) { }

    /**
     * Autoriza el acceso a rutas específicas.
     * @param next {ActivatedRouteSnapshot} 
     * @param state {RouterStateSnapshot} 
     */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.storageService.isAuthenticated()){
      this.router.navigate(['/home']);
      return false;
    }
    
    return true;
  }
}
