import { TestBed } from '@angular/core/testing';

import {PerspectiveService} from './perspective.service';

describe('PerspectiveTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerspectiveService = TestBed.get(PerspectiveService);
    expect(service).toBeTruthy();
  });
});
