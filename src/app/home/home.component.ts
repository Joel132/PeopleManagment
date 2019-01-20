import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthenticationService} from "../shared/helpers/authentication.service";
import {StorageService} from "../shared/helpers/storage.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private storageService: StorageService,
    private authenticationService: AuthenticationService
              ) {}

  public logout(): void{
    this.authenticationService.logout().subscribe(
      response => {if(response) {this.storageService.logout();}}
    );
  }
            
 
}
