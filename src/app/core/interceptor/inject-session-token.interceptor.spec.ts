import { TestBed } from '@angular/core/testing';

import { InjectSessionTokenInterceptor } from './inject-session-token.interceptor';

describe('InjectSessionTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InjectSessionTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InjectSessionTokenInterceptor = TestBed.inject(InjectSessionTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
