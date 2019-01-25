import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFuncionariosComponent } from './editar-funcionarios.component';

describe('EditarFuncionariosComponent', () => {
  let component: EditarFuncionariosComponent;
  let fixture: ComponentFixture<EditarFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarFuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
