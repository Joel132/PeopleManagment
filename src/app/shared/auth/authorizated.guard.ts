import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {StorageService} from "../helpers/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
    private storageService: StorageService) { }

  canActivate() {
  
    console.log(this.storageService.isAuthenticated());
    if (this.storageService.isAuthenticated() ) {
    // logged in y es administrador o scrum master so return true 
      return true;
    }

  // not logged in so redirect to login page
      else if(!this.storageService.isAuthenticated()){
      this.router.navigate(['/login']);
      return false;
    }

    // no es admin ni scrum master
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
  canActivateChild(){
    console.log(21321);
    if (this.storageService.isAuthenticated() && (this.storageService.getCurrentRol() == 1 ||this.storageService.getCurrentRol() == 2)) {
      // logged in y es administrador o scrum master so return true 
      
        return true;
      }
      else{
        console.log(21321);
        return false;
      }
  }
}
