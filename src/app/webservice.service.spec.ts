import { TestBed, inject } from '@angular/core/testing';

import { WebserviceService } from './webservice.service';

describe('WebserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebserviceService]
    });
  });

  it('should be created', inject([WebserviceService], (service: WebserviceService) => {
    expect(service).toBeTruthy();
  }));
});
