import { TestBed } from '@angular/core/testing';

import { EnviarArchivoService } from './enviar-archivo.service';

describe('EnviarArchivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviarArchivoService = TestBed.get(EnviarArchivoService);
    expect(service).toBeTruthy();
  });
});
