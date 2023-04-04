import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumAdministrationComponent } from './forum-administration.component';

describe('ForumAdministrationComponent', () => {
  let component: ForumAdministrationComponent;
  let fixture: ComponentFixture<ForumAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
