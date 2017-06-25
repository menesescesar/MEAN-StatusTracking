import { TestBed, inject } from '@angular/core/testing';

import { ProductionService } from './production.service';

describe('ProductionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductionService]
    });
  });

  it('should be created', inject([ProductionService], (service: ProductionService) => {
    expect(service).toBeTruthy();
  }));
});
