import { TestBed, inject } from '@angular/core/testing';

import { MachineService } from './machine.service';

describe('MachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineService]
    });
  });

  it('should be created', inject([MachineService], (service: MachineService) => {
    expect(service).toBeTruthy();
  }));
});
