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
import { RecibirPostulanteService } from 'src/app/shared/helpers/recibir-postulante.service';
import { of } from 'rxjs';


describe('VerPostulanteComponent', () => {
  let component: VerPostulanteComponent;
  let fixture: ComponentFixture<VerPostulanteComponent>;
  let id: number= 1;
  const postulante: Postulante=POSTULANTES.find(p=>p.id==id);
  const ESTADOS : string[] = ['Desafío Pendiente','Desafío Recibido', 'Desafío Revisado', 'Entrevista Administrador', 'Entrevista SM', 'Entrevista Team','Aprobado', 'Rechazado'];  
  const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
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
        
        let vistaElement=fixture.debugElement.query(By.css('#'+tag+'Si'));
        expect(vistaElement).toBeTruthy(titulo+' exista');//Se espera que exista el bloque del nombre
        if(vistaElement)expect(vistaElement.nativeElement.textContent.trim()).toEqual(expected,titulo+' concuerda');
      }
      else{
        
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



  it('mostrar el nombre segun corresponda', async(()=>{
    valor('nombre',postulante.nombre||postulante.apellido?postulante.nombre+' '+postulante.apellido:'','Nombre');
    let nombre=postulante.nombre;
    postulante.nombre='';
    fixture.detectChanges();
    valor('nombre',postulante.nombre||postulante.apellido?postulante.nombre+' '+postulante.apellido:'','Nombre');
    postulante.nombre=nombre;
  }));

  it('mostrar el apellido segun corresponda', async(()=>{
    valor('apellido',postulante.nombre||postulante.apellido?postulante.nombre+' '+postulante.apellido:'','Apellido');
    let apellido=postulante.apellido;
    postulante.apellido='';
    fixture.detectChanges();
    valor('apellido',postulante.nombre||postulante.apellido?postulante.nombre+' '+postulante.apellido:'','Apellido');
    postulante.apellido=apellido;
  }));

  it('mostrar el estado segun corresponda', async(()=>{
    //
    let estado=postulante.estado;
    //Se cambia a otra valor
    postulante.estado='2';
    fixture.detectChanges();
    valor('estado',postulante.estado?ESTADOS[Number.parseInt(postulante.estado)-1]:null,'Estado');
    //Se ve si muestra no disponible
    postulante.estado='';
    fixture.detectChanges();
    valor('estado',postulante.estado?ESTADOS[Number.parseInt(postulante.estado)-1]:null,'Estado');
    //Se vuelve al valor original
    postulante.estado=estado;
  }));

  it('mostrar el documento segun corresponda', async(()=>{
    //
    
    valor('documento',postulante.documento,'documento');
    let documento=postulante.documento;
    //Se ve si muestra no disponible
    postulante.documento='';
    fixture.detectChanges();
    valor('documento',postulante.documento,'documento');
    //Se vuelve al valor original
    postulante.documento=documento;
  }));

  it('mostrar el celular segun corresponda', async(()=>{
    //
    
    valor('celular',postulante.celular,'celular');
    let celular=postulante.celular;
    //Se ve si muestra no disponible
    postulante.celular='';
    fixture.detectChanges();
    valor('celular',postulante.celular,'celular');
    //Se vuelve al valor original
    postulante.celular=celular;
  }));

  it('mostrar el mail segun corresponda', async(()=>{
    //
    
    valor('mail',postulante.mail,'mail');
    let mail=postulante.mail;
    //Se ve si muestra no disponible
    postulante.mail='';
    fixture.detectChanges();
    valor('mail',postulante.mail,'mail');
    //Se vuelve al valor original
    postulante.mail=mail;
  }));

  it('mostrar la direccion segun corresponda', async(()=>{
    //
    
    valor('direccion',postulante.direccion,'direccion');
    let direccion=postulante.direccion;
    //Se ve si muestra no disponible
    postulante.direccion='';
    fixture.detectChanges();
    valor('direccion',postulante.direccion,'direccion');
    //Se vuelve al valor original
    postulante.direccion=direccion;
  }));

  it('mostrar la fecha de Nacimiento segun corresponda', async(()=>{
    const fecha=new Date(postulante.fechaDeNacimiento);
    valor('fecha',''+monthNames[fecha.getMonth()]+' '+fecha.getDate()+', '+fecha.getFullYear(),'fecha de nacimiento');
    let fecha1=postulante.fechaDeNacimiento;
    postulante.fechaDeNacimiento=null;
    fixture.detectChanges();
    valor('fecha',null,'fecha de nacimiento');
    postulante.fechaDeNacimiento=fecha1;
  }));
  
  it('mostrar el genero segun corresponda', async(()=>{
    //
    
    valor('genero',postulante.genero,'genero');
    let genero=postulante.genero;
    //Se ve si muestra no disponible
    postulante.genero='';
    fixture.detectChanges();
    valor('genero',postulante.genero,'genero');
    //Se vuelve al valor original
    postulante.genero=genero;
  }));

  it('mostrar el comentario general segun corresponda', async(()=>{

    valor('comentario',postulante.comentario,'comentario');
    let comentario=postulante.comentario;
    postulante.comentario='';
    fixture.detectChanges();
    valor('comentario',postulante.comentario,'comentario');
    postulante.comentario=comentario;
      
  }));

  it('mostrar el comentario team segun corresponda', fakeAsync(()=>{
    fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement.click();
    fixture.detectChanges();
      //Se cambia a la pestana comentarios y se comprueban los datos del mismo
      
    tick()
          valor('comentarioTeam',postulante.comentarioTeam,'comentario team');
          let comentarioTeam=postulante.comentarioTeam;
          postulante.comentarioTeam='';
          fixture.detectChanges();
          valor('comentarioTeam',postulante.comentarioTeam,'comentario team');
          postulante.comentarioTeam=comentarioTeam;
      
      
  }));

  it('mostrar el comentario desafio segun corresponda', fakeAsync(()=>{
    fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement.click();
    fixture.detectChanges();
      //Se cambia a la pestana comentarios y se comprueban los datos del mismo
      
    tick()
          valor('comentarioDesafio',postulante.comentarioDesafio,'comentario desafio');
          let comentarioDesafio=postulante.comentarioDesafio;
          postulante.comentarioDesafio='';
          fixture.detectChanges();
          valor('comentarioDesafio',postulante.comentarioDesafio,'comentario desafio');
          postulante.comentarioDesafio=comentarioDesafio;
       
  }));

  it('mostrar el comentario sm segun corresponda', fakeAsync(()=>{
    fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement.click();
    fixture.detectChanges();
      //Se cambia a la pestana comentarios y se comprueban los datos del mismo
      
    tick();
          valor('comentarioSm',postulante.comentarioSm,'comentario scrum master');
          let comentarioSm=postulante.comentarioSm;
          postulante.comentarioSm='';
          fixture.detectChanges();
          valor('comentarioSm',postulante.comentarioSm,'comentario scrum master');
          postulante.comentarioSm=comentarioSm;
     

      
  }));

  it('mostrar el comentario admin segun corresponda', fakeAsync(()=>{
    fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement.click();
    fixture.detectChanges();
      //Se cambia a la pestana comentarios y se comprueban los datos del mismo
      
    tick()
    valor('comentarioAdmin',postulante.comentarioAdmin,'comentario administrador');
    let comentarioAdmin=postulante.comentarioAdmin;
    postulante.comentarioAdmin='';
    fixture.detectChanges();
    valor('comentarioAdmin',postulante.comentarioAdmin,'comentario administrador');
    postulante.comentarioAdmin=comentarioAdmin;
        

      
  }));


  it('deberia habilitar/desabilitar el boton del cv segun el caso',()=>{
    expect(fixture.debugElement.query(By.css('#curriculumSi')).nativeElement.disabled).toBeFalsy('Se espera que el boton de descarga curriculum este habilitado');
    let cv=postulante.curriculumUrl;
    postulante.curriculumUrl='';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#curriculumNo')).nativeElement.disabled).toBeTruthy('Se espera que el boton de descarga curriculum este deshabilitado');
    postulante.curriculumUrl=cv;
  });

  it('deberia habilitar/desabilitar el boton del desafio segun el caso',()=>{
    expect(fixture.debugElement.query(By.css('#desafioSi')).nativeElement.disabled).toBeFalsy('Se espera que el boton de descarga desafio este habilitado');
    let desafio=postulante.desafioUrl;
    postulante.desafioUrl='';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#desafioNo')).nativeElement.disabled).toBeTruthy('Se espera que el boton de descarga desafio este deshabilitado');
    postulante.desafioUrl=desafio;
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
