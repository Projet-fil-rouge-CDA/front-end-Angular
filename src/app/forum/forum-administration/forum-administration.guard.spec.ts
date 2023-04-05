import { TestBed } from '@angular/core/testing';

import { ForumAdministrationGuard } from './forum-administration.guard';

describe('ForumAdministrationGuard', () => {
  let guard: ForumAdministrationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ForumAdministrationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
