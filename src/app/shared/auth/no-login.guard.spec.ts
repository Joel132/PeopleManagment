import { TestBed, async, inject } from '@angular/core/testing';

import { NoLoginGuard } from './no-login.guard';

describe('NoLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoLoginGuard]
    });
  });

  xit('should ...', inject([NoLoginGuard], (guard: NoLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
