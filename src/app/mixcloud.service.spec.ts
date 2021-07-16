import { TestBed } from '@angular/core/testing';

import { MixcloudService } from './mixcloud.service';

describe('MixcloudService', () => {
  let service: MixcloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MixcloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
