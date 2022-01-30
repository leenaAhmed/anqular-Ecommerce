import { TestBed } from '@angular/core/testing';

import { AdsAnnouncementService } from './ads-announcement.service';

describe('AdsAnnouncementService', () => {
  let service: AdsAnnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdsAnnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
