import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditarPostulanteComponent } from './editar-postulante.component';
import { MaterialModule } from 'src/app/angular_material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
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

fdescribe('EditarPostulanteComponent', () => {
  let component: EditarPostulanteComponent;
  let fixture: ComponentFixture<EditarPostulanteComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let postulante: Postulante;
  


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, HttpClientModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
      declarations: [
        EditarPostulanteComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get(id) {
                return 2;
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

  afterEach(()=>{
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia invalidar los campos vacios',() => {
    component.formEditarPostulante.controls['mail'].setValue('');
    expect(component.formEditarPostulante.valid).toBeFalsy();
  });

  it('deberia invalidar los campos vacios',() => {
    component.formEditarPostulante.controls['nombre'].setValue('');
    expect(component.formEditarPostulante.valid).toBeFalsy();
  });
  
  it('deberia invalidar los campos vacios',() => {
    component.formEditarPostulante.controls['apellido'].setValue(''); 
    expect(component.formEditarPostulante.valid).toBeFalsy();
  });
  
  it('deberia invalidar introducir numeros en el campo nombre', async(() => {
    //let nombre = component.formEditarPostulante.controls['nombre'];
    //nombre.setValue('12345');
    //nombre.markAsDirty();
    let nombre = fixture.debugElement.query(By.css('#nombre')).nativeElement;
    nombre.value = '12345';
    nombre.dispatchEvent(new Event('input'));

    fixture.debugElement.query(By.css('#boton')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    const hint = dom.query(By.css('#hint-nombre-solo-letra'));
    expect(hint.nativeElement.innerText).toMatch('Ingresa solo Letras');
    }))

    

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

  it('deberia invalidar introducir cien caracteres en el campo nombre',() => {
    component.formEditarPostulante.controls['nombre'].setValue('a'.repeat(100));
    expect(component.formEditarPostulante.valid).toBeFalsy();
  })

  it('deberia invalidar introducir cien caracteres en el campo apellido',() => {
    component.formEditarPostulante.controls['apellido'].setValue('a'.repeat(100));
    expect(component.formEditarPostulante.valid).toBeFalsy();
  })

  fit('deberia recuperar los campos de texto correctamente', fakeAsync(() => {
    postulante = POSTULANTES[1];
    function compara(tag: string, valor:any) {
      const atributo = fixture.debugElement.query(By.css('#'+tag));
      expect(atributo.nativeElement.value).toMatch(valor);
    }
    /* 
    
    compara('nombre', postulante.nombre);
    compara('apellido', postulante.apellido);
    compara('mail', postulante.mail);
    compara('direccion', postulante.direccion);
    compara('documento', postulante.documento);
    compara('celular', postulante.celular);
     */
    const tab = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement;
    tab.click();
    fixture.detectChanges();
    tick();
    console.log(fixture.debugElement.query(By.css('#comentarioDesafio')));
    compara('comentarioDesafio', postulante.comentarioDesafio);
    compara('comentario', postulante.comentario);
    compara('comentarioSM', postulante.comentarioSm);
    compara('comentarioAdmin', postulante.comentarioAdmin);
    compara('comentarioTeam', postulante.comentarioTeam);
  }))

  it('deberia recuperar los campos correctamente', () => {
    postulante = POSTULANTES[1];
    let estado = component.formEditarPostulante.controls['estado'].value;
    let fecha = component.formEditarPostulante.controls['fechaDeNacimiento'].value;
    expect(estado).toMatch(postulante.estado);
    expect(fecha).toMatch(postulante.fechaDeNacimiento);
    //nombre.markAsDirty();
  })

  it('deberia recuperar el estado correctamente', async(() => {
    postulante = POSTULANTES[1];
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      //fixture.detectChanges();
      console.log(fixture.debugElement.query(By.css('#estado')).nativeElement.textContent);
    })
  }))
});


/*
//console.log("El objeto: ", fixture.debugElement.queryAll(By.css('.mat-select-value')));
/* const trigger = fixture.debugElement.queryAll(By.css('mat-select-value'))[0].nativeElement;
const innerSpan = trigger.children[0].children[0];
console.log(innerSpan.innerHTML);
console.log("TRIGER\n",trigger); 

//console.log(fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement.innerText);

console.log(trigger.children["0"].children["0"].children["0"].children["0"]);

//fixture.detectChanges();

//const opcion = fixture.debugElement.query(By.css('#estado')).nativeElement.children["0"]; //.children["0"].children["0"].nativeElement.innerHTML;

//console.log("OPCION\n",opcion);

//console.log(trigger.contentText);

const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
trigger.click();
fixture.whenStable().then(() => {
  const opcion = fixture.debugElement.query(By.css('#estado'));
  console.log(opcion);
  console.log(opcion.nativeElement);
  console.log(opcion.children[1]);
   // console.log(trigger);   
  });


  //expect(compiled.query(By.css('#nombre')).nativeElement.value.trim()).toMatch(postulante.nombre);
  
  */