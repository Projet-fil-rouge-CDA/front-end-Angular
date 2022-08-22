import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkingComponent } from './talking.component';

describe('TalkingComponent', () => {
  let component: TalkingComponent;
  let fixture: ComponentFixture<TalkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
