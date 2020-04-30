import { TestBed } from '@angular/core/testing';

import { WpServiceService } from './wp-service.service';

describe('WpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WpServiceService = TestBed.get(WpServiceService);
    expect(service).toBeTruthy();
  });
});
