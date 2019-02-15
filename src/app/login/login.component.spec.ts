import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../shared/helpers/authentication.service';
import { AppModule } from '../app.module';
import { of } from 'rxjs';
import { MaterialModule } from '../angular_material';
import { HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
class MockError{
  public error: {code: number, message: string};

  submitLogin(){

    return this.error;
  }
}



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let service:  MockError;
  let originalTimeout;

  beforeEach(async(() => {
    service = new MockError();
    TestBed.configureTestingModule({
      imports: [ MaterialModule,RouterTestingModule.withRoutes([{path:'login',component:LoginComponent},{path:'',component:LoginComponent},{path:'**',redirectTo:'/login',pathMatch:'full'}]),FormsModule, ReactiveFormsModule,HttpClientModule,BrowserAnimationsModule ],
      declarations:[LoginComponent]
    })
    .compileComponents().then(() => {
      spyOn(TestBed.get(AuthenticationService),'login').and.callThrough();
      fixture = TestBed.createComponent(LoginComponent);
      TestBed.get(Router).initialNavigation();
      component = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia contener el texto INICIAR SESIÓN', async(() => {
    fixture.detectChanges();
    const com = fixture.debugElement.nativeElement;
    expect(com.querySelector('p').textContent).toContain('INICIAR SESIÓN');
    expect(com.querySelector('span').textContent).toContain('PeopleManagement');
  }));

  it('Deberia invalidar el form', async(() => {
    component.ngOnInit();
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('Deberia mostrar mensaje de error solicitando completar los campos', async(() => {
    component.ngOnInit();
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    fixture.detectChanges();
    let hint1 = fixture.debugElement.query(By.css('#hint-email'));
    spyOn(component, 'submitLogin').and.returnValue(false);
    expect(hint1).toBeTruthy();
  }));

  it ('Deberia mostrar mensaje de error solicitando completar el campo de correo', async(() => {
    component.ngOnInit();
    component.loginForm.controls['email'].setValue('');
    fixture.detectChanges();
    component.loginForm.controls['password'].setValue('usaToday1!');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    fixture.detectChanges();
    let hint3 = fixture.debugElement.query(By.css('#hint-email'));
    spyOn(component, 'submitLogin').and.returnValue(false);
    expect(hint3).toBeTruthy();
  }));

  it('Deberia mostrar mensaje de error solicitando completar el campo de password', async(() => {
    component.ngOnInit();
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();
    component.loginForm.controls['email'].setValue('luis@softwarenatura.com');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    fixture.detectChanges();
    let hint4 = fixture.debugElement.query(By.css('#hint-pass'));
    spyOn(component, 'submitLogin').and.returnValue(false);
    expect(hint4).toBeTruthy();
  }));

  it('Deberia mostrar un mensaje de credenciales invalidas al ingresar datos incorrectos', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    component.loginForm.controls['email'].setValue('luisjjjj.com');
    component.loginForm.controls['password'].setValue('45874');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{ 
      setTimeout(()=>{fixture.detectChanges();
      service.error = {code:1, message: 'Credenciales invalidas'}
      let hint = fixture.debugElement.query(By.css('#hint-val'));
      expect(component.submitted).toBeTruthy();
      expect(component.error).toBeTruthy()
      expect(hint).toBeTruthy()})
    })
  }));

  it('Deberia cambiar la url de direccionamiento de login a home', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    component.loginForm.controls['email'].setValue('luis@softwarenatura.com');
    component.loginForm.controls['password'].setValue('usaToday1!');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{ 
      setTimeout(()=>{fixture.detectChanges();
      TestBed.get(Router).url
      expect(component.submitted).toBeTruthy();
      expect(component.error).toBeFalsy()
      expect(TestBed.get(Router).url).toBe('/')
    })
    })
  }));

});
