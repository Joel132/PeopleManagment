import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarPostulantesComponent } from './listar-postulantes.component';
import {AppModule} from 'src/app/app.module';
import {RecibirPostulanteService} from 'src/app/shared/helpers/recibir-postulante.service';
import { StorageService } from 'src/app/shared/helpers/storage.service';
import { Session } from 'src/app/shared/models/session';
import { MaterialModule } from 'src/app/angular_material';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { fakeBackendProvider } from 'src/app/shared/helpers/fake-backend';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import { Postulante } from 'src/app/shared/models/postulante';
import {POSTULANTES} from 'src/app/shared/mocks/mock-postulantes';
import {of} from 'rxjs';

describe('ListarPostulantesComponent', () => {
  let servicio: RecibirPostulanteService;
  let component: ListarPostulantesComponent;
  let fixture: ComponentFixture<ListarPostulantesComponent>;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     // declarations: [ListarPostulantesComponent],
      imports: [MaterialModule,RouterModule,HttpClientModule,RouterTestingModule,BrowserAnimationsModule],
      providers: [RecibirPostulanteService,StorageService,fakeBackendProvider],
      declarations: [ListarPostulantesComponent]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ListarPostulantesComponent); //se crea el componente
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
  it('El componente debe crearse', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Debe contar con barra para buscar',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const elemento = dom.querySelector('#buscador');
    expect(elemento).not.toBeNull()

  }); 
  
  it('Probar que todos los nombres de las columnas se muestren correctamente ', (done) => {
    //expect(component.users).toEqual(testUsers);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    
    let listadoPostulantes = fixture.nativeElement.querySelectorAll('tr');

    // se comprueban los nombres de los titulos
    let headerRow = listadoPostulantes[0];
    expect(headerRow.cells[0].textContent).toBe(' Perfil ');
    expect(headerRow.cells[1].textContent).toBe(' Nombre ');
    expect(headerRow.cells[2].textContent).toBe(' Apellido ');
    expect(headerRow.cells[3].textContent).toBe(' Mail ');
    expect(headerRow.cells[4].textContent).toBe(' Celular ');
    expect(headerRow.cells[5].textContent).toBe(' Estado ');
    expect(headerRow.cells[6].textContent).toBe(' Acción ');  

    done();
    });
  });

  it('Probar que se muestre correctamente los datos del primer postulante ', (done) => {
    //expect(component.users).toEqual(testUsers);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    
    let listadoPostulantes = fixture.nativeElement.querySelectorAll('tr');
   
    //compara que los campos muestres los datos correspondientes para el primer postulantes
    let postulante = listadoPostulantes[1]; 
    expect(postulante.cells[1].innerText).toBe(POSTULANTES[0].nombre);
    expect(postulante.cells[2].innerText).toBe(POSTULANTES[0].apellido);
    expect(postulante.cells[3].innerText).toBe(POSTULANTES[0].mail);
    expect(postulante.cells[4].innerText).toBe(POSTULANTES[0].celular);
    expect(postulante.cells[5].innerText).toBe(component.estadosPostulante[parseInt(POSTULANTES[0].estado)-1]);
    
    done();
    });
  });

  it('Probar que ningun postulante tenga datos vacios o no disponibles  ', (done) => {
    //expect(component.users).toEqual(testUsers);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    
    let listadoPostulantes = fixture.nativeElement.querySelectorAll('tr');
   
    //comprueba que los campos no esten vacios en todas las filas
    listadoPostulantes.forEach(fila => {
      expect(fila.cells[1].innerText).not.toBe('');
      expect(fila.cells[2].innerText).not.toBe('');
      expect(fila.cells[3].innerText).not.toBe('');
      expect(fila.cells[4].innerText).not.toBe('');
      expect(fila.cells[5].innerText).not.toBe('');
      
    });
    done();
    });
  });

  it('Se debe listar según lo ingresado en el buscador',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const buscador = dom.querySelector('#buscador');
    
    //Se ingresa un nombre en la barra de buscador
    buscador.value = 'Juan';
    
    //Se detectan los cambios
    fixture.detectChanges();

    //se recupera la lista actualizada de postulantes
    let listadoPostulantes = fixture.nativeElement.querySelectorAll('tr');
    let primerPostulante = listadoPostulantes[1];
    
    //se compara el primer nombre obtenido del listado
    expect(primerPostulante.cells[1].innerText).toBe('Juan');      
    
    
  });
  
  it('Debe contar con filtro por Estados',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const elemento = dom.querySelector('#filtroEstado');
    expect(elemento).not.toBeNull()
  });

  it('Debe contar con paginacion',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const elemento = dom.querySelector('#paginacion');
    expect(elemento).not.toBeNull()
  });
  
  it('El boton de ver postulante funciona', () => {
    fixture.detectChanges();
    spyOn(component, 'onclickPostulante');
    const dom = fixture.debugElement.nativeElement;
    const fila = dom.querySelector('#verPostulante');
    fila.click();
    expect(component.onclickPostulante).toHaveBeenCalled();
  });
  
  it('El boton de agregar postulante funciona', () => {
    fixture.detectChanges();
    spyOn(component, 'onclickAgregar');
    const dom = fixture.debugElement.nativeElement;
    const boton = dom.querySelector('#botonAgregar');
    boton.click();
    expect(component.onclickAgregar).toHaveBeenCalled();
  });
  
  it('Tiene un titulo',()=>{
    fixture.detectChanges();
    expect(component.titulo).not.toBeNull();
  });
    
  it('El titulo es Lista de Postulantes',()=>{
    fixture.detectChanges();
    expect(component.titulo).toEqual("Lista de Postulantes");
  });

 
});
