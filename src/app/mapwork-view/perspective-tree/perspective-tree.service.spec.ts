import { TestBed } from '@angular/core/testing';

import { PerspectiveTreeService } from './perspective-tree.service';

describe('PerspectiveTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerspectiveTreeService = TestBed.get(PerspectiveTreeService);
    expect(service).toBeTruthy();
  });
});
