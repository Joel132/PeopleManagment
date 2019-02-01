import { TestBed } from '@angular/core/testing';

import { ObtenerTituloService } from './obtener-titulo.service';

describe('ObtenerTituloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerTituloService = TestBed.get(ObtenerTituloService);
    expect(service).toBeTruthy();
  });
});
