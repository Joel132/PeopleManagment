import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListarFuncionariosComponent } from './listar-funcionarios.component';
import {RecibirFuncionarioService} from 'src/app/shared/helpers/recibir-funcionario.service';
import { StorageService } from 'src/app/shared/helpers/storage.service';
import { Session } from 'src/app/shared/models/session';
import { MaterialModule } from 'src/app/angular_material';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { fakeBackendProvider } from 'src/app/shared/helpers/fake-backend';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {By, BrowserModule} from '@angular/platform-browser';
import { Funcionario } from 'src/app/shared/models/funcionario';
import {FUNCIONARIOS} from 'src/app/shared/mocks/mock-funcionarios';
import { inject } from '@angular/core';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { RESPUESTA_FUNCIONARIOS } from 'src/app/shared/mocks/mock-response-funcionarios';


describe('ListarFuncionariosComponent', () => {
  let servicio: RecibirFuncionarioService;
  let component: ListarFuncionariosComponent;
  let fixture: ComponentFixture<ListarFuncionariosComponent>;
  let id: number= 1;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule,
        RouterTestingModule.withRoutes(
            [{path:'funcionario',component:ListarFuncionariosComponent},
            {path: 'crear', component:ListarFuncionariosComponent},
            {path:'ver/:id',component: ListarFuncionariosComponent},
            {path:'**',redirectTo:'funcionario',pathMatch:'full'}]),
          HttpClientModule,BrowserAnimationsModule,BrowserModule],
      
      providers: [RecibirFuncionarioService,StorageService,fakeBackendProvider],
      
      declarations: [ListarFuncionariosComponent]
    })
    .compileComponents().then(()=>{
      spyOn(TestBed.get(RecibirFuncionarioService),'getFuncionarios').and.returnValue(of(RESPUESTA_FUNCIONARIOS))
      fixture = TestBed.createComponent(ListarFuncionariosComponent); //se crea el componente
      TestBed.get(Router).initialNavigation();
      component = fixture.componentInstance; //se instancia el componente
    });
  }));

  beforeEach(async(() => {
    //se obtiene un token de autenticacion para emular una sesion
    TestBed.get(StorageService).setCurrentSession(new Session('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwic2NvcGVzIjoidXNlcjEiLCJpYXQiOjE1NTAxNDc0NjcsImV4cCI6MTU1NTE5NTQ2N30.3xbkTlgOIYHFVdjiRZklKaYwnRSUx6Oox-MPinvlGXqwppi4MBTa3cyJm6tsNvAW-WL3CzUVWTTouVzofWZV3A',null,null,null));

    //se llama a la funcion que luego trae a los postulantes
    component.ngOnInit();
    
  }));

  /* se comprueba que se haya creado el componente */
  xit('El componente debe crearse', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  xit('Debe contar con barra para buscar',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const elemento = dom.querySelector('#buscar');
    expect(elemento).not.toBeNull()

  }); 
  
  xit('Probar que todos los nombres de las columnas se muestren correctamente ', (done) => {
    //expect(component.users).toEqual(testUsers);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    
    let listadoFuncionarios = fixture.nativeElement.querySelectorAll('mat-header-row');
    // se comprueban los nombres de los titulos
    let headerRow = listadoFuncionarios[0];
    expect(headerRow.children[0].textContent).toBe(' Perfil ');
    expect(headerRow.children[1].textContent).toBe(' Nombre ');
    expect(headerRow.children[2].textContent).toBe(' Apellido ');
    expect(headerRow.children[3].textContent).toBe(' Fin de Contrato ');
    expect(headerRow.children[4].textContent).toBe(' Celular ');
    expect(headerRow.children[5].textContent).toBe(' Estado ');
    done();
    });
  });

  xit('Probar que se muestre correctamente los datos del primer funcionario ', (done) => {
    //expect(component.users).toEqual(testUsers);
    fixture.detectChanges();
    spyOn(component, 'getFuncionarios').and.returnValue(true);
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    
    let listadoFuncionarios = fixture.nativeElement.querySelectorAll('mat-row');
   
    //compara que los campos muestres los datos correspondientes para el primer postulantes
    let funcionario = listadoFuncionarios[1]; 
    expect(funcionario.children[1].innerText).toBe(FUNCIONARIOS[0].nombre);
    expect(funcionario.children[2].innerText).toBe(FUNCIONARIOS[0].apellido);
    expect(funcionario.children[3].innerText).toBe(FUNCIONARIOS[0].fechaVencimiento);
    expect(funcionario.children[4].innerText).toBe(FUNCIONARIOS[0].celular);
    expect(funcionario.children[5].innerText).toBe(component.estados[parseInt(FUNCIONARIOS[0].nombre_estado)-1]);
    
    done();
    });
  });

  xit('Probar que ningun funcionario tenga datos vacios o no disponibles  ', (done) => {
    //expect(component.users).toEqual(testUsers);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    
    let listadoFuncionarios = fixture.nativeElement.querySelectorAll('mat-row');
   
    //comprueba que los campos no esten vacios en todas las filas
    listadoFuncionarios.forEach(fila => {
      expect(fila.children[1].innerText).not.toBe('');
      expect(fila.children[2].innerText).not.toBe('');
      expect(fila.children[3].innerText).not.toBe('');
      expect(fila.children[4].innerText).not.toBe('');
      expect(fila.children[5].innerText).not.toBe('');
      
    });
    done();
    });
  });

  it('Se debe listar según lo ingresado en el buscador',async(()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const buscador = dom.querySelector('#buscar');
    const nombreBuscado = 'Nicanor';

    //Se ingresa un nombre en la barra de buscador
    buscador.value = nombreBuscado;
    console.log(buscador);
    
    //se dispara el evento para aplicar el filtro al listado
    buscador.dispatchEvent(new Event('keyup'));

    //Se detectan cambios
    fixture.detectChanges();
    
    //se recupera la lista actualizada de postulantes
    let listadoPostulantes = fixture.nativeElement.querySelectorAll('mat-row');
    console.log(listadoPostulantes)
    let primerPostulante = listadoPostulantes[0];
    
    fixture.whenStable().then(()=>{
      if(listadoPostulantes.length>0) //si es que se encuentra al menos un nombre      
        //se espera que el primer nombre de la lista coincida 
        expect(primerPostulante.children[1].innerText).toBe(nombreBuscado);     
    });

  }));

  fit('Se filtra por estados correctamente',async(()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const filtro = dom.querySelector('#filtro');
    const filtrarEstado = 'fiber_manual_record   Activo';

  component.applyFilter('Activo')
    //Se ingresa un nombre en la barra de buscador
   
    filtro.value = filtrarEstado;
    
    //se dispara el evento para aplicar el filtro al listado
    filtro.dispatchEvent(new Event('keydown'));

    //Se detectan cambios
    fixture.detectChanges();
    
    //se recupera la lista actualizada de postulantes
    let listadoFuncionario= fixture.nativeElement.querySelectorAll('mat-row');
    let primerPostulante = listadoFuncionario[1];
  
    //Se espera un tiempo para renderizar la pantalla
    
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
     
      
      if(listadoFuncionario.length>1) //si es que se encuentra al menos un nombre      
        //se espera que el primer nombre de la lista coincida 
        expect(primerPostulante.children[5].innerText).toContain(filtrarEstado);     
    });

  }));

  
  it('Debe contar con filtro por Estados',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const elemento = dom.querySelector('#filtro');
    expect(elemento).not.toBeNull()
  });

  xit('Debe contar con paginacion',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const elemento = dom.querySelector('#pagina');
    expect(elemento).not.toBeNull()
  });
  
  xit('El boton de agregar Funcionario redirecciona correctamente', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    let cr = fixture.debugElement.query(By.css('#agregar_desktop')).nativeElement;
    cr.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      //fixture.detectChanges();
      //TestBed.get(Router).url
      expect(TestBed.get(Router).url).toEqual('/crear');
    })
  }));

  xit('El boton de ver redirecciona correctamente', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    let cr = fixture.debugElement.query(By.css('mat-cell')).nativeElement;
    cr.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      //fixture.detectChanges();
      //TestBed.get(Router).url
      expect(TestBed.get(Router).url).toEqual('/ver/' +id);
    })
  }));
  
  xit('Tiene un titulo',()=>{
    fixture.detectChanges();
    expect(component.titulo).not.toBeNull();
  });
    
  xit('El titulo es Lista de Funcionarios',()=>{
    fixture.detectChanges();
    expect(component.titulo).toEqual("Lista de Funcionarios");
  });

  //se espera que el test falle
  xit('Probar que un dato vacio muestre un mensaje correctamente ', (done) => {

    fixture.detectChanges();
   
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let listadoFuncionarios = fixture.nativeElement.querySelectorAll('mat-row');
      
      //compara que los campos muestres los datos correspondientes para el primer postulantes
      let funcionario = listadoFuncionarios[2];
      expect(funcionario.children[4].innerText).toBe('No disponible');
      done();
    });
    
  }); 

 
});
