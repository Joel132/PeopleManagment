import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {StorageService} from "../helpers/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate {
  constructor(private router: Router,
    private storageService: StorageService) { }

  canActivate() {
  
    console.log(this.storageService.isAuthenticated());
    if (this.storageService.isAuthenticated()) {
    // logged in so return true
      return true;
    }

  // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
