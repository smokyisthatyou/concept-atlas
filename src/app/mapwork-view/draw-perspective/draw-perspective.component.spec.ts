import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawPerspectiveComponent } from './draw-perspective.component';

describe('DrawPerspectiveComponent', () => {
  let component: DrawPerspectiveComponent;
  let fixture: ComponentFixture<DrawPerspectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawPerspectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawPerspectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
