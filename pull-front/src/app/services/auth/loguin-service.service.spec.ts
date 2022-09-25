import { TestBed } from '@angular/core/testing';

import { LoguinServiceService } from './loguin-service.service';

describe('LoguinServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoguinServiceService = TestBed.get(LoguinServiceService);
    expect(service).toBeTruthy();
  });
});
