import { TestBed } from '@angular/core/testing';

import { ForumGuard } from './forum.guard';

describe('ForumGuard', () => {
  let guard: ForumGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ForumGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
