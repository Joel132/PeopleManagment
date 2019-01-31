//modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';

//servicios
import {fakeBackendProvider} from './shared/helpers/fake-backend';
import {AgregarPostulanteService} from './shared/helpers/agregar.service';

// Angular Material y animaciones
import {MaterialModule} from './angular_material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CrearPostulanteComponent } from './postulantes/crear-postulante/crear-postulante.component';
import { EditarPostulanteComponent } from './postulantes/editar-postulante/editar-postulante.component';
import { ListarPostulantesComponent } from './postulantes/listar-postulantes/listar-postulantes.component';
import { CrearFuncionariosComponent } from './funcionarios/crear-funcionarios/crear-funcionarios.component';
import { ListarFuncionariosComponent } from './funcionarios/listar-funcionarios/listar-funcionarios.component';
import { EditarFuncionariosComponent } from './funcionarios/editar-funcionarios/editar-funcionarios.component';
import { VerFuncionarioComponent } from './funcionarios/ver-funcionario/ver-funcionario.component';
import { VerPostulanteComponent } from './postulantes/ver-postulante/ver-postulante.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CrearPostulanteComponent,
    EditarPostulanteComponent,
    ListarPostulantesComponent,
    CrearFuncionariosComponent,
    ListarFuncionariosComponent,
    EditarFuncionariosComponent,
    VerFuncionarioComponent,
    VerPostulanteComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule, LayoutModule, 
    AppRoutingModule,
    HttpClientModule,
    ],
  providers: [fakeBackendProvider, AgregarPostulanteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
