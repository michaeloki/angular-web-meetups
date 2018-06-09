import { TestBed, inject } from '@angular/core/testing';

import { MessageserviceService } from './messageservice.service';

describe('MessageserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageserviceService]
    });
  });

  it('should be created', inject([MessageserviceService], (service: MessageserviceService) => {
    expect(service).toBeTruthy();
  }));
});
