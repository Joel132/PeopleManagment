import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPostulanteComponent } from './crear-postulante.component';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';


describe('CrearPostulanteComponent', () => {
  let component: CrearPostulanteComponent;
  let fixture: ComponentFixture<CrearPostulanteComponent>;

  let fecha_actual: Date;
  let aux: number;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPostulanteComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */

  it('Form en blanco es inválido', () => {
    expect(component.formCrearPostulantes.valid).toBeFalsy();
  });

  it('Si no se completa los campos requeridos, no se puede guardar', async(() => {
    component.formCrearPostulantes.controls['nombre'].setValue('');
    component.formCrearPostulantes.controls['apellido'].setValue('');
    component.formCrearPostulantes.controls['mail'].setValue('');
    fixture.detectChanges();
    expect(component.formCrearPostulantes.valid).toBeFalsy();
    //Formulario inválido no se debe poder clickear en el boton de guardado
    spyOn(component, 'onSubmit');
    let bt = fixture.debugElement.query(By.css('.natura-button-1')).nativeElement;
    bt.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);    
  }));

  it('Campos requeridos completados, se puede guardar', async(() => {
    component.formCrearPostulantes.controls['nombre'].setValue('Jose');
    component.formCrearPostulantes.controls['apellido'].setValue('Pereira');
    component.formCrearPostulantes.controls['mail'].setValue('jp@gmail.com');
    fixture.detectChanges();
    expect(component.formCrearPostulantes.valid).toBeTruthy();
    //Agregar clic al boton guardar
    spyOn(component, 'onSubmit');
    let bt = fixture.debugElement.query(By.css('.natura-button-1')).nativeElement;
    bt.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));

  it('El campo Mail es debe cumplir su formato', async(() => {
    let mail = component.formCrearPostulantes.controls['mail'];
    mail.setValue('test');
    expect(mail.valid).toBeFalsy();
  }));

  it('Comprobar cantidad de caracteres en campo Celular', async(() => {
    let errors = {};
    let celular = component.formCrearPostulantes.controls['celular'];
    celular.setValue('123');
    errors = celular.errors || {};
    console.log(errors);
    /* console.log(errors['minlength']);
    console.log(errors['minlength'].requiredLength);
    console.log(errors['minlength'].actualLength); */
    expect(errors['minlength'].actualLength).not.toBeGreaterThanOrEqual(errors['minlength'].requiredLength);
  }));

  it('Comprobar cantidad de caracteres en campo Documento', async(()=>{
    let errors = {};
    let documento = component.formCrearPostulantes.controls['documento'];
    documento.setValue('1234567891011121314161617181920212223242526272829303132333435');
    errors = documento.errors || {};
    console.log(errors);
    expect(errors['minlength'].actualLength).toBeLessThanOrEqual(60);
  }));

  it('Fecha de nacimiento fidedigna', async(() => {
    component.formCrearPostulantes.controls['fechaDeNacimiento'].setValue('01/01/1971');
    console.log("Cambiar fecha por una inválida");
    fecha_actual = new Date (component.formCrearPostulantes.controls['fechaDeNacimiento'].value);
    //The getTime() method returns the number of milliseconds since January 1, 1970
    aux = fecha_actual.getTime()/(1000*60*60*24*365); 
    expect(aux).toBeGreaterThanOrEqual(0);
  }));
});
