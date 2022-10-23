import { TestBed } from '@angular/core/testing';

import { KPIRegistryService } from './kpiregistry.service';

describe('KpiregistryService', () => {
  let service: KPIRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KPIRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
