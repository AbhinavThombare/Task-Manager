import { TestBed } from '@angular/core/testing';

import { GloballoaderService } from './globalloader.service';

describe('GloballoaderService', () => {
  let service: GloballoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GloballoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
