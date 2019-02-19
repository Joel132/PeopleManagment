import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditarPostulanteComponent } from './editar-postulante.component';
import { MaterialModule } from 'src/app/angular_material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarPostulanteService } from 'src/app/shared/helpers/editar-postulante.service';
import { AuthenticationService } from 'src/app/shared/helpers/authentication.service';
import { RecibirPostulanteService } from 'src/app/shared/helpers/recibir-postulante.service';
import { StorageService } from 'src/app/shared/helpers/storage.service';
import { Session } from 'src/app/shared/models/session';
import { DebugElement } from '@angular/core';
import { fakeBackendProvider } from 'src/app/shared/helpers/fake-backend';
import { By } from '@angular/platform-browser';
import { POSTULANTES } from 'src/app/shared/mocks/mock-postulantes';
import { of } from 'rxjs';
import { Postulante } from 'src/app/shared/models/postulante';
import { ListarPostulantesComponent } from '../listar-postulantes/listar-postulantes.component';

fdescribe('EditarPostulanteComponent', () => {
  let component: EditarPostulanteComponent;
  let fixture: ComponentFixture<EditarPostulanteComponent>;
  let id: number= 2;
  let de: DebugElement;
  let el: HTMLElement;
  let postulante: Postulante;
  


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule, 
        RouterTestingModule.withRoutes(
          [
            {path:'editar/:id',component:EditarPostulanteComponent},
            {path:'postulante',component:EditarPostulanteComponent},
            {path:'**',redirectTo:'editar/'+id,pathMatch:'full'}
          ]
        ), 
        HttpClientModule, 
        BrowserAnimationsModule, 
        FormsModule, 
        ReactiveFormsModule
      ],
      declarations: [
        EditarPostulanteComponent,
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get(id) {
                return this.id;
              }
            }
          }
        }
      },
        EditarPostulanteService,
        RecibirPostulanteService,
        StorageService,
        fakeBackendProvider
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(EditarPostulanteComponent);
        component = fixture.componentInstance;
        spyOn(TestBed.get(RecibirPostulanteService),'getPostulante').and.returnValue(of(POSTULANTES[1]));
      });


  }));

  beforeEach(async(() => {
    TestBed.get(StorageService).setCurrentSession(new Session('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwic2NvcGVzIjoidXNlcjEiLCJpYXQiOjE1NDk5OTM5OTUsImV4cCI6MTU1NTA0MTk5NX0.rLn2Cm1V5FALBTZok-1y0bJYY8dfISWshg61uYfybs6ffucMMBh8xUDK82VQr89s7mq_j81peLAc8k3iHyXLrw', 'Bearer', null, null));
  }));

  beforeEach(()=>{
    fixture.detectChanges();
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test para verificar que no permita guardar el formulario con el campo email vacio
   */
  it('deberia invalidar el campo email vacio',() => {
    component.formEditarPostulante.controls['mail'].setValue('');
    expect(component.formEditarPostulante.valid).toBeFalsy();
  });

  /**
   * Test para verificar que no permita guardar el formulario con el campo nombre vacio
   */
  it('deberia invalidar el campo nombre vacio',() => {
    component.formEditarPostulante.controls['nombre'].setValue('');
    expect(component.formEditarPostulante.valid).toBeFalsy();
  });
  
  /**
   *  Test para verificar que no permita guardar el formulario con el campo apellido vacio
   */
  it('deberia invalidar el campo apellido vacio',() => {
    component.formEditarPostulante.controls['apellido'].setValue(''); 
    expect(component.formEditarPostulante.valid).toBeFalsy();
  });


  /**
   * Test para verificar que no se introduzcan numeros en el campo nombre
   * y que exista una advertencia indicando el error
   */
  it('deberia invalidar introducir numeros en el campo nombre', async(() => {
    let nombre = fixture.debugElement.query(By.css('#nombre')).nativeElement;
    nombre.value = '12345';
    nombre.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const hint = dom.query(By.css('#hint-nombre-solo-letra'));
    expect(hint.nativeElement.innerText).toMatch('Ingresa solo Letras');
  }))

  /**
   * Test para verificar que no se introduzcan simbolos en el campo nombre
   * y que exista una advertencia indicandolo
   */
  it('deberia invalidar introducir simbolos en el campo nombre',() => {
    let nombre = fixture.debugElement.query(By.css('#nombre')).nativeElement;
    nombre.value = '#!?';
    nombre.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const hint = dom.query(By.css('#hint-nombre-solo-letra'));
    expect(hint.nativeElement.innerText).toMatch('Ingresa solo Letras');
  })

  /**
   * Test para verificar que no se permitan introducir mas de 60 caracteres
   * para el campo nombre
   */
  it('deberia invalidar introducir cien caracteres en el campo nombre',() => {
    component.formEditarPostulante.controls['nombre'].setValue('a'.repeat(100));
    expect(component.formEditarPostulante.valid).toBeFalsy();
  })

   /**
   * Test para verificar que no se introduzcan numeros en el campo apellido
   * y que exista una advertencia indicando el error
   */
  it('deberia invalidar introducir numeros en el campo apellido', async(() => {
    let apellido = fixture.debugElement.query(By.css('#apellido')).nativeElement;
    apellido.value = '12345';
    apellido.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const hint = dom.query(By.css('#hint-apellido-solo-letra'));
    expect(hint).toBeTruthy();
    if(hint)expect(hint.nativeElement.innerText).toMatch('Ingresa solo Letras');
  }))

  /**
   * Test para verificar que no se introduzcan simbolos en el campo apellido
   * y que exista una advertencia indicandolo
   */
  it('deberia invalidar introducir simbolos en el campo apellido',() => {
    let apellido = fixture.debugElement.query(By.css('#apellido')).nativeElement;
    apellido.value = '#!?';
    apellido.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const hint = dom.query(By.css('#hint-apellido-solo-letra'));
    expect(hint).toBeTruthy();
    if(hint)expect(hint.nativeElement.innerText).toMatch('Ingresa solo Letras');
  })

  /**
   * Test para verificar que no se permitan introducir mas de 60 caracteres
   * para el campo apellido
   */
  it('deberia invalidar introducir cien caracteres en el campo apellido',() => {
    component.formEditarPostulante.controls['apellido'].setValue('a'.repeat(100));
    expect(component.formEditarPostulante.valid).toBeFalsy();
  })

  /**
   * Test para verificar que el campo de email sea valido
   * 
   * OBS: Se espera que el mensaje sea en español 
   */
  it('deberia invalidar introducir emails invalidos en el campo email', async(() => {
    let mail = fixture.debugElement.query(By.css('#mail')).nativeElement;
    mail.value = 'correo';
    mail.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const hint = dom.query(By.css('#mail-error'));
    expect(hint.nativeElement.innerText).toMatch('Email invalido');
  }))

  /**
   * Test para verificar que los campos esperados se reciban correctamente
   */
  it('deberia recuperar los campos de texto correctamente', async(() => {
    postulante = POSTULANTES[1];
    function compara(tag: string, valor:any) {
      const atributo = fixture.debugElement.query(By.css('#'+tag));
      expect(atributo.nativeElement.value).toMatch(valor);
    }
    compara('nombre', postulante.nombre);
    compara('apellido', postulante.apellido);
    compara('mail', postulante.mail);
    compara('direccion', postulante.direccion);
    compara('documento', postulante.documento);
    compara('celular', postulante.celular);
    const tab = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement;
    tab.click();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
        compara('comentarioDesafio', postulante.comentarioDesafio);
        compara('comentario', postulante.comentario);
        compara('comentarioSm', postulante.comentarioSm);
        compara('comentarioAdmin', postulante.comentarioAdmin);
        compara('comentarioTeam', postulante.comentarioTeam);
    });
  }))

  /**
   * Test para verificar que el campo estado se recupera correctamente
   */
  it('deberia recuperar el estado correctamente', async(() => {
    postulante = POSTULANTES[1];
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      const estado = fixture.debugElement.query(By.css('#estado')).nativeElement.textContent;
      if(estado)expect(estado).toBeTruthy();
      expect(estado).toMatch('Desafío Recibido');
    })
  }))
  
  /**
   * Test para verificar que el campo sexo se recupera correctamente
   */
  it('deberia recuperar el sexo correctamente', async(() => {
    postulante = POSTULANTES[1];
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      const genero = fixture.debugElement.query(By.css('#genero')).nativeElement.textContent;
      if(genero)expect(genero).toBeTruthy();
      expect(genero).toMatch('Masculino');
    })
  }))

  /**
   * Test para validar que el campo CI no reciba valores invalidos
   */
  it('deberia invalidar introducir letras en el campo CI', async(() => {
    let documento = fixture.debugElement.query(By.css('#documento')).nativeElement;
    documento.value = 'abcde';
    documento.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const error = dom.query(By.css('#error-documento'));
    expect(error).toBeTruthy();
    if(error)expect(error.nativeElement.innerText).toMatch('Ingrese solo numeros');
  }))

  /**
   * Test para validar que el campo telefono no reciba letras
   */
  it('deberia invalidar introducir letras en el campo telefono', async(() => {
    let telefono = fixture.debugElement.query(By.css('#celular')).nativeElement;
    telefono.value = 'abcdef';
    telefono.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const error = dom.query(By.css('#error-formato-telefono'));
    expect(error).toBeTruthy();
    if(error)expect(error.nativeElement.innerText.trim()).toMatch('Ingrese un formato valido. Ej:+5959723214 o 0984124721');
  }))

  /**
   * Test para validar que el campo telefono no reciba menos de 6 caracteres
   */
  it('deberia invalidar si se introducen menos de 6 caracteres en el campo telefono', async(() => {
    let telefono = fixture.debugElement.query(By.css('#celular')).nativeElement;
    telefono.value = '12345';
    telefono.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const error = dom.query(By.css('#error-longitud-telefono'));
    expect(error).toBeTruthy();
    if(error)expect(error.nativeElement.innerText.trim()).toMatch('Ingrese al menos 6 digitos');
  }))

  /**
   * Test para validar que el campo fecha de nacimiento no reciba valores invalidos
   */
  it('deberia invalidar si se introducen caracteres invalidos en el campo fecha de nacimiento', async(() => {
    let fechaNac = fixture.debugElement.query(By.css('#fechaDeNacimiento')).nativeElement;
    fechaNac.value = 'abcdefghij';
    fechaNac.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const error = dom.query(By.css('#error-fecha-invalida'));
    expect(error).toBeTruthy();
    if(error)expect(error.nativeElement.innerText.trim()).toMatch('Introduzca una fecha correcta');
  }))
  
  /**
   * Test para verificar que el campo fecha se recupera correctamente
   */ 
  it('debería recuperar la fecha correctamente', async(() => {
    postulante = POSTULANTES[1];
    let fechaNac = fixture.debugElement.query(By.css('#fechaDeNacimiento'));
    let fechaForm = new Date(fechaNac.nativeElement.value);
    let fechaPost = new Date(postulante.fechaDeNacimiento);
    expect(fechaForm).toEqual(fechaPost);
  }));
    
  /**
   * Test para verificar que al guardar se redireccione a la lista de postulantes
   */
  it('debería redireccionar a la lista de postulantes al guardar',fakeAsync(()=>{
    spyOn(component,'volverAlListado').and.callThrough();
    spyOn(TestBed.get(EditarPostulanteService),'editarPostulante').and.returnValue(of(POSTULANTES[1]));
    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    tick(4000);
    expect(component.volverAlListado).toHaveBeenCalled();
    expect(TestBed.get(Router).url).toEqual('/postulante');
  }));
});