import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBajaComponent } from './dialog-baja.component';

describe('DialogBajaComponent', () => {
  let component: DialogBajaComponent;
  let fixture: ComponentFixture<DialogBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
