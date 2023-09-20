import { TestBed } from '@angular/core/testing';

import { GloballoaderInterceptor } from './globalloader.interceptor';

describe('GloballoaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GloballoaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GloballoaderInterceptor = TestBed.inject(GloballoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
