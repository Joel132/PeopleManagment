import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthorizatedGuard} from './shared/auth/authorizated.guard';
import {NoLoginGuard} from './shared/auth/no-login.guard';
import { AgregarPostulanteComponent } from './postulante/agregar-postulante/agregar-postulante.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [ AuthorizatedGuard ] },
  { path: 'login', component: LoginComponent, canActivate: [NoLoginGuard] },
  { path: 'agregar', component: AgregarPostulanteComponent, canActivate: [NoLoginGuard] },
  { path: '**', redirectTo: '/home'}];


  

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}