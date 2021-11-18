import { TestBed } from '@angular/core/testing';

import { OwnersDataService } from './owners-data.service';

describe('OwnersDataService', () => {
  let service: OwnersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
