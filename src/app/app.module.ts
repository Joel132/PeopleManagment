import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {fakeBackendProvider} from './shared/helpers/fake-backend';
import {AgregarPostulanteService} from './shared/helpers/agregar.service';
// Animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Angular Material
import {MaterialModule} from './angular_material';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';

import { CrearPostulanteComponent } from './postulantes/crear-postulante/crear-postulante.component';
import { EditarPostulanteComponent } from './postulantes/editar-postulante/editar-postulante.component';
import { ListarPostulantesComponent } from './postulantes/listar-postulantes/listar-postulantes.component';
import { CrearFuncionariosComponent } from './funcionarios/crear-funcionarios/crear-funcionarios.component';
import { ListarFuncionariosComponent } from './funcionarios/listar-funcionarios/listar-funcionarios.component';
import { EditarFuncionariosComponent } from './funcionarios/editar-funcionarios/editar-funcionarios.component';
import { VerFuncionarioComponent } from './funcionarios/ver-funcionario/ver-funcionario.component';
import { VerPostulanteComponent } from './postulantes/ver-postulante/ver-postulante.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogBajaComponent } from './funcionarios/listar-funcionarios/dialog-baja/dialog-baja.component';
//editar-postulante
import { FileUploaderService } from './shared/helpers/file-uploader.service';
import { EditarPostulanteService } from 'src/app/shared/helpers/editar-postulante.service';

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
    VerPostulanteComponent,
    DialogBajaComponent

  ],
  entryComponents: [DialogBajaComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, 
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [fakeBackendProvider, AgregarPostulanteService, FileUploaderService, EditarPostulanteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
