import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {fakeBackendProvider} from './shared/helpers/fake-backend';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CrearPostulanteComponent,
    EditarPostulanteComponent,
    ListarPostulantesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, 
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
