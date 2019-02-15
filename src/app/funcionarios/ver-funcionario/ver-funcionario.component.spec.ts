import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFuncionarioComponent } from './ver-funcionario.component';

describe('VerFuncionarioComponent', () => {
  let component: VerFuncionarioComponent;
  let fixture: ComponentFixture<VerFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
