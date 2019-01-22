import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthorizatedGuard} from './shared/auth/authorizated.guard';
import {NoLoginGuard} from './shared/auth/no-login.guard';
import { ListarPostulantesComponent } from './postulantes/listar-postulantes/listar-postulantes.component';
import { EditarPostulanteComponent } from './postulantes/editar-postulante/editar-postulante.component';
import { CrearPostulanteComponent } from './postulantes/crear-postulante/crear-postulante.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [ AuthorizatedGuard ] , children: 
    [
      {
        path:'postulante',
        canActivateChild: [AuthorizatedGuard],
        children: [
          { path: 'crear', component: CrearPostulanteComponent },
          { path: '', component: ListarPostulantesComponent, canActivateChild: [AuthorizatedGuard] },
          { path: 'editar/:id', component: EditarPostulanteComponent, canActivateChild: [AuthorizatedGuard] }
        ]
      }
      
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [ NoLoginGuard ] },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}