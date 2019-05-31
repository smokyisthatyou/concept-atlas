import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectiveListComponent } from './perspective-list.component';

describe('PerspectiveListComponent', () => {
  let component: PerspectiveListComponent;
  let fixture: ComponentFixture<PerspectiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerspectiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerspectiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
