import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListarPostulantesComponent } from './listar-postulantes.component';
import {RecibirPostulanteService} from 'src/app/shared/helpers/recibir-postulante.service';
import { StorageService } from 'src/app/shared/helpers/storage.service';
import { Session } from 'src/app/shared/models/session';
import { MaterialModule } from 'src/app/angular_material';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {By,  BrowserModule} from '@angular/platform-browser';
import {POSTULANTES} from 'src/app/shared/mocks/mock-postulantes';
import { Router } from '@angular/router';
import { ResponseLista } from 'src/app/shared/models/responseLista';
import { of } from 'rxjs';
import { RESPUESTA_POSTULANTES } from 'src/app/shared/mocks/mock-response-postulantes';

describe('ListarPostulantesComponent', () => {
  let servicio: RecibirPostulanteService;
  let component: ListarPostulantesComponent;
  let fixture: ComponentFixture<ListarPostulantesComponent>;
  let id: number= 1;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     // declarations: [ListarPostulantesComponent],
      imports: [MaterialModule,
        RouterTestingModule.withRoutes(
            [{path:'postulante',component:ListarPostulantesComponent},
            {path: 'postulante/crear', component:ListarPostulantesComponent},
            {path:'ver/:id',component: ListarPostulantesComponent},
            {path:'',component:ListarPostulantesComponent},
            {path:'**',redirectTo:'postulante',pathMatch:'full'}]),
          HttpClientModule,BrowserAnimationsModule,BrowserModule],
      
      providers: [RecibirPostulanteService,StorageService],
      
      declarations: [ListarPostulantesComponent]
    })
    .compileComponents().then(()=>{
      spyOn(TestBed.get(RecibirPostulanteService),'getPostulantes').and.returnValue(of(RESPUESTA_POSTULANTES)) //se 
      TestBed.get(Router).initialNavigation(); //se pone la ruta inicial 
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

  /**
   * Test para verificar que el componenete ListarPostulanteComponent 
   * se cree correctamente
   */
  it('El componente debe crearse', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  /**
   * Test para verificar que se cuente con un id #buscador 
   * que corresponde al input del buscador
   */
  it('Debe contar con barra para buscar',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const elemento = dom.querySelector('#buscador');
    expect(elemento).not.toBeNull()

  }); 
  
  /**
   * Test para verificar que se cuente con un id #filtroEstado 
   * que corresponde a la lista para filtrar por estado
   */
  it('Debe contar con filtro por Estados',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const elemento = dom.querySelector('#filtroEstado');
    expect(elemento).not.toBeNull()
  });
  
  /**
   * Test para verificar que se cuente con un id #paginacion 
   * que corresponde a la seccion para controlar la paginacion de
   * la lista
   */
  it('Debe contar con paginacion',()=>{
    fixture.detectChanges();
    const dom = fixture.debugElement.nativeElement;
    const elemento = dom.querySelector('#paginacion');
    expect(elemento).not.toBeNull()
  });

  /**
   * Test para verificar que el componente cuente con un atributo titulo 
   * no nulo
   */
  it('Debe contar con un titulo',()=>{
    fixture.detectChanges();

    //se espera que el componente cuente con un atributo titulo que no 
    //este nulo
    expect(component.titulo).not.toBeNull();
  });

  /** 
   * Test para verificar que el titulo del componente sea 
   * 'Lista de Postulantes'
  */ 
  it('El titulo es Lista de Postulantes',()=>{
    fixture.detectChanges();
    expect(component.titulo).toEqual("Lista de Postulantes");
  });

  /**
   * Test para verificar que se realice la llamada a funcion 
   * correspondiente a Ver Postulante
   */
  it('Se realiza la llamada a funcion para Ver Postulante', () => {
    fixture.detectChanges();

    //Se define un SpyOn para espiar al metodo onClickPostulante de 
    //del componente
    spyOn(component, 'onclickPostulante');
    
    //se extrae el DOM 
    const dom = fixture.debugElement.nativeElement;
    
    //se extrae la fila cuyo id es verPostulante 
    const fila = dom.querySelector('#verPostulante');

    //se hace click en la fila 
    fila.click();

    //se espera que la funcion espiada haya sido llamada
    expect(component.onclickPostulante).toHaveBeenCalled();
  });

  /**
   * Test para verificar que se realice la llamada a funcion 
   * correspondiente a Agregar Postulante
   */ 
  it('Se realiza la llamada a funcion para Agregar Postulante', () => {
    fixture.detectChanges();

    //se define un espia para el metodo onClickAgregar del componente
    spyOn(component, 'onclickAgregar');
    
    //Se extrae el DOM 
    const dom = fixture.debugElement.nativeElement;
    
    //se extrae el boton para agregar postulante
    const boton = dom.querySelector('#botonAgregar');
   
    //Se hace click en el boton
    boton.click();
   
    //se verifica si se hace la llamada a la funcion espiada
    expect(component.onclickAgregar).toHaveBeenCalled();
  });

  /**
   * Test para verificar que los nombres de las columnas sean correctos
   */
  it('Probar que todos los nombres de las columnas se muestren correctamente ', (done) => {
    //expect(component.users).toEqual(testUsers);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    
    //se extrae la lista de postulantes
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

  /**
   * Test para verificar que los datos del primer postulante listado se muestren 
   * correctamente según datos predefinidos
   */
  it('Probar que se muestre correctamente los datos del primer postulante ', (done) => {
    //expect(component.users).toEqual(testUsers);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    
    //se obtiene la lista de postulantes
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

  /**
   * Test para verificar que al presionar el boton de Agregar Postulante, se cambie correctamente la URL
   */
  it('El boton de Agregar Postulante redirecciona correctamente', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(component,'onclickAgregar').and.callThrough();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#botonAgregar')).nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      setTimeout(()=>{
        fixture.detectChanges();
        expect(component.onclickAgregar).toHaveBeenCalled();
        TestBed.get(Router).url
        expect(component.onclickAgregar).toBeTruthy();
        expect(TestBed.get(Router).url).toEqual('/postulante/crear');
        })
      })
  }));
 
  /**
   * Test para verificar que al presionar un Postulante, se cambie correctamente la URL,
   * Este test debe dar como resultado FAILED
   */
  it('El boton de ver Postulante redirecciona correctamente', async(() => {
 
    //fixture.detectChanges();
    
    //se 
    spyOn(component,'onclickPostulante').and.callThrough();
    fixture.detectChanges();

    //Se extrae la fila del DOM
    const dom = fixture.debugElement.nativeElement;
    const fila = dom.querySelector('#verPostulante');

    //se hace click en la fila
    fila.click();

    //se detectan cambios
    //fixture.detectChanges();
    
    fixture.whenStable().then(()=>{
      setTimeout(()=>{
        fixture.detectChanges();
        expect(component.onclickPostulante).toHaveBeenCalled();
        TestBed.get(Router).url

        expect(component.onclickPostulante).toBeTruthy();
        expect(TestBed.get(Router).url).toEqual('/postulante/ver/' + id);
        })
      })
  }));

  /**
   * Test para verificar que los postulantes listados no tengan datos vacios
   * Este test debe dar como resultado FAILED 
   */
  it('Probar que ningun postulante tenga datos vacios', (done) => {

    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    
    //se extrae la lista de postulantes
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

  /**
   * Test para verificar que al buscar por nombre, los nombres del listado
   * deben coincidir con dicho nombre buscado
   */
  it('Se debe listar según lo ingresado en el buscador',fakeAsync(()=>{
    fixture.detectChanges();

    //se extraen los elementos del DOM
    const dom = fixture.debugElement.nativeElement;
    const buscador = dom.querySelector('#buscador');
    const nombreBuscado = 'Carlos';

    //Se ingresa un nombre en la barra de buscador
    buscador.value = nombreBuscado;
    
    //se dispara el evento para aplicar el filtro al listado
    buscador.dispatchEvent(new Event('keyup'));

    //Se detectan cambios
    fixture.detectChanges();
    
    //se recupera la lista actualizada de postulantes
    let listadoPostulantes = fixture.nativeElement.querySelectorAll('tr');
    let primerPostulante = listadoPostulantes[1];
  
    //Se espera un tiempo para renderizar la pantalla
    //tick(4000); //4 segundos
    
    fixture.whenStable().then(()=>{
      //se espera que el primer nombre de la lista coincida 
      expect(primerPostulante.cells[1].innerText).toBe(nombreBuscado);     
    });

  }));
  
  /**
   * Test para verificar que, en caso de que un postulante no tenga todos los campos 
   * cargados, en el listado se debe mostrar dicho campo como 'No Disponible'.
   * Este test debe dar como resultado FAILED 
   */
  it('Probar que un dato vacio muestre un mensaje de No Disponible ', (done) => {

    fixture.detectChanges();
   
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      //se extrae la lista de postulantes
      let listadoPostulantes = fixture.nativeElement.querySelectorAll('tr');
      
      //compara que los campos muestres los datos correspondientes a un postulante que se 
      //conoce de antemano que no tiene numero de telefono
      let postulante = listadoPostulantes[1];
      expect(postulante.cells[4].innerText).toBe('No disponible');
      done();
    });
    
  });  

  /**
   * Test para verificar que al filtrar la lista por estado, se muestren solo 
   * los postulantes con dicho estado. Se comprueba con el primer postulante
   * listado
   */
  it('Se filtra por estados correctamente',fakeAsync(()=>{
    fixture.detectChanges();

    //se extraen los elementos del DOM
    const dom = fixture.debugElement.nativeElement;
    const filtro = dom.querySelector('#filtroEstado');
    const filtrarEstado = 'Rechazado'; //estado que se espera filtrar 
    
    //Se ingresa un nombre en la barra de buscador
    filtro.value = filtrarEstado;
    
    //se dispara el evento para aplicar el filtro al listado
    filtro.dispatchEvent(new Event('keyup'));
    
    //Se detectan cambios
    fixture.detectChanges();
    
    //se recupera la lista actualizada de postulantes
    let listadoPostulantes = fixture.nativeElement.querySelectorAll('tr');

    //Se captura el primer postulante de la lista
    let primerPostulante = listadoPostulantes[1];
    
    //Se espera un tiempo para renderizar la pantalla
    tick(4000); //4 segundos
    
    fixture.whenStable().then(()=>{
      //se espera que el estado del primer postulante de la lista coincida
      expect(primerPostulante.cells[5].innerText).toBe(filtrarEstado);
    });
    
  }));

  /**
   * Test para verificar que al cambiar de pagina, el nombre del primer postulante
   * corresponda con el nombre predefinido esperado
   */
  it('La Paginación funciona correctamente', async(()=>{

    //se extrae y se hace click al boton siguiente de la paginacion
    fixture.debugElement.query(By.css('#paginacion')).nativeElement.click();
    
    //Se detectan cambios
    fixture.detectChanges();

    //se cambia la pagina del paginator en el componente
    component.paginator.nextPage();
    
    //Se detectan cambios
    fixture.detectChanges();
    
    fixture.whenStable().then(()=>{

      //se extrae la lista de postulantes
      let listadoPostulantes = fixture.nativeElement.querySelectorAll('tr');
      
      //se extrae el primer postulante de la lista
      let primerPostulante = listadoPostulantes[1];
      
      //se espera que el primer nombre del primer postulante al cambiar la pagina sea 'Amelio'
      expect(primerPostulante.cells[1].innerText).toBe('Amelio');
    })
    }));

  /**
   * Test para verificar que la cantidad mostrada en el paginator sea correcta
   */
  it('Se verifica que el total en el Paginator coincida con la cantidad real de postulantes', fakeAsync(()=>{

    //se detectan cambios
    fixture.detectChanges();

    //se espera a que se renderice la pagina
    tick();
    
    //Se extrae el label que muestra el total de postulantes en el paginador
    let cadena = fixture.debugElement.query(By.css('.mat-paginator-range-label')).nativeElement.innerText
    
    //Se convierte esa cadena en un vector de cadenas
    let vectorCadena = cadena.split(" ");

    //Se espera que la cantidad mostrada en el paginator corresponda con la cantidad real de postulantes  
    expect(parseInt(vectorCadena[vectorCadena.length-1])).toEqual(POSTULANTES.length);

  }));

});
