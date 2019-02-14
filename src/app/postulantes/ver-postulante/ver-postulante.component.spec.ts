import { async, ComponentFixture, TestBed, fakeAsync,tick } from '@angular/core/testing';

import { VerPostulanteComponent } from './ver-postulante.component';
import { HttpClientModule} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/angular_material';
import { RouterTestingModule } from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {POSTULANTES} from '../../shared/mocks/mocks'
import { By } from '@angular/platform-browser';
import { Postulante } from 'src/app/shared/models/postulante';
import { BrowserModule } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { RecibirPostulanteService } from 'src/app/shared/helpers/recibir-postulante.service';
import { of } from 'rxjs';

describe('VerPostulanteComponent', () => {
  let component: VerPostulanteComponent;
  let fixture: ComponentFixture<VerPostulanteComponent>;
  let id: number= 1;
  const postulante: Postulante=POSTULANTES.find(p=>p.id==id);
  const estado : string[] = ['Desafío Pendiente','Desafío Recibido', 'Desafío Revisado', 'Entrevista Administrador', 'Entrevista SM', 'Entrevista Team','Aprobado', 'Rechazado'];  

  /**
     * Mensaje que se muestra cuando no carga un dato
     */
    const noDis='No disponible';
    /**
     * Funcion que compara un elemento del template con su correspondiente valor esperado
     * @param tag El nombre del id del elemento html que contiene el valor mostrado
     * @param expected El valor que se espera coincida
     * @param titulo El nombre del expect
     */
    function valor(tag: string,expected,titulo:string){
      if(expected){
        console.log(titulo+' si')
        let vistaElement=fixture.debugElement.query(By.css('#'+tag+'Si'));
        expect(vistaElement).toBeTruthy(titulo+' exista');//Se espera que exista el bloque del nombre
        if(vistaElement)expect(vistaElement.nativeElement.textContent.trim()).toEqual(expected,titulo+' concuerda');
      }
      else{
        console.log(titulo+' no')
        let vistaElement=fixture.debugElement.query(By.css('#'+tag+'No'));
        expect(vistaElement).toBeTruthy(titulo+' no este disponible');//Se espera que exista el bloque del nombre
        if(vistaElement)expect(vistaElement.nativeElement.textContent.trim()).toEqual(noDis,titulo+' concuerda');
      }
    }
  
  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      imports: [MaterialModule,RouterTestingModule.withRoutes([{path:'ver/:id',component:VerPostulanteComponent},{path:'postulante/editar/:id',component:VerPostulanteComponent},{path:'**',redirectTo:'ver/'+id,pathMatch:'full'}]),HttpClientModule,BrowserAnimationsModule,BrowserModule],
      declarations: [
      VerPostulanteComponent  ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {paramMap:{
            get(ruta){
              return id;
            }
          }}
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    spyOn(TestBed.get(RecibirPostulanteService),'getPostulante').and.returnValue(of(POSTULANTES.find(arg=>arg.id==id)));
    fixture = TestBed.createComponent(VerPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(()=>fixture.detectChanges());
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    

  });

  it('mostrar los datos segun lo recibido', async(()=>{
    
    valor('nombre',postulante.nombre||postulante.apellido?postulante.nombre+' '+postulante.apellido:'','Nombre y apellido');
    valor('estado',postulante.estado?estado[Number.parseInt(postulante.estado)-1]:null,'Estado');
    valor('documento',postulante.documento,'documento');
    valor('celular',postulante.celular,'celular');
    valor('mail',postulante.mail,'mail');
    valor('direccion',postulante.direccion,'direccion');
    if(postulante.fechaDeNacimiento){
      const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
      const fecha=new Date(postulante.fechaDeNacimiento);
      valor('fecha',''+monthNames[fecha.getMonth()]+' '+fecha.getDate()+', '+fecha.getFullYear(),'fecha de nacimiento');

    }
    else{
      valor('fecha',null,'fecha de nacimiento');
    }
    valor('genero',postulante.genero,'genero');
    console.log(fixture.debugElement.queryAll(By.css('.mat-tab-label')))
    fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement.click();
    fixture.detectChanges();
      //Se cambia a la pestana comentarios y se comprueban los datos del mismo
      
      fixture.whenStable().then(()=>{
        setTimeout(()=>{
        valor('comentarioDesafio',postulante.comentarioDesafio,'comentario desafio');
        valor('comentarioAdmin',postulante.comentarioAdmin,'comentario administrador');
        valor('comentarioSm',postulante.comentarioSm,'comentario scrum master');
        valor('comentarioTeam',postulante.comentarioTeam,'comentario team');
        valor('comentario',postulante.comentario,'comentario');},1)
      })
      
    
  }));

  it('mostrar el nombre si el apellido no esta disponible', async(()=>{
    let apellido=postulante.apellido;
    postulante.apellido='';
    fixture.detectChanges();
    valor('nombre',postulante.nombre||postulante.apellido?postulante.nombre+' '+postulante.apellido:'','Nombre y apellido');
    postulante.apellido=apellido;
  }));

  it('deberia habilitar/desabilitar los botones de los archivos segun el caso',()=>{
    if(postulante.desafioUrl){
      expect(fixture.debugElement.query(By.css('#desafioSi')).nativeElement.disabled).toBeFalsy('Se espera que el boton de descarga desafio este habilitado');
    }
    else{
      expect(fixture.debugElement.query(By.css('#desafioNo')).nativeElement.disabled).toBeTruthy('Se espera que el boton de descarga desafio este deshabilitado');
    }
    if(postulante.curriculumUrl){
      expect(fixture.debugElement.query(By.css('#curriculumSi')).nativeElement.disabled).toBeFalsy('Se espera que el boton de descarga curriculum este habilitado');
    }
    else{
      expect(fixture.debugElement.query(By.css('#curriculumNo')).nativeElement.disabled).toBeTruthy('Se espera que el boton de descarga curriculum este deshabilitado');
    }
  });

  it('deberia ir al boton de editar',fakeAsync(()=>{
    expect(TestBed.get(Router).url).toEqual('/','Deberia estar en la raiz al comienzo');
    spyOn(component,'editarPostulante').and.callThrough();
    fixture.debugElement.query(By.css('#editarButton')).nativeElement.click();
    expect(component.editarPostulante).toHaveBeenCalled();
    fixture.detectChanges();
    tick();
    expect(TestBed.get(Router).url).toEqual('/postulante/editar/'+id);
  }));
});
