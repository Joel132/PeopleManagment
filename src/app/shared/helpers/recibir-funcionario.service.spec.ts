import { TestBed } from '@angular/core/testing';

import { RecibirFuncionarioService } from './recibir-funcionario.service';

describe('RecibirFuncionarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: RecibirFuncionarioService = TestBed.get(RecibirFuncionarioService);
    expect(service).toBeTruthy();
  });
});
