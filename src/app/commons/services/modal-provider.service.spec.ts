import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal-provider.service';

describe('ModalProviderService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
