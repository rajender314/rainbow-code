import { TestBed } from '@angular/core/testing';

import { SortProviderService } from './sort.provider.service';

describe('SortProviderService', () => {
  let service: SortProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
