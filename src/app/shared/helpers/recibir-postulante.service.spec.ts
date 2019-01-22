import { TestBed } from '@angular/core/testing';

import { RecibirPostulanteService } from './recibir-postulante.service';

describe('RecibirPostulanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecibirPostulanteService = TestBed.get(RecibirPostulanteService);
    expect(service).toBeTruthy();
  });
});
