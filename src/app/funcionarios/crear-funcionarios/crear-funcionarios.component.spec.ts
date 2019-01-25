import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFuncionariosComponent } from './crear-funcionarios.component';

describe('CrearFuncionariosComponent', () => {
  let component: CrearFuncionariosComponent;
  let fixture: ComponentFixture<CrearFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearFuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
