import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectiveTreeComponent } from './perspective-tree.component';

describe('PerspectiveTreeComponent', () => {
  let component: PerspectiveTreeComponent;
  let fixture: ComponentFixture<PerspectiveTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerspectiveTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerspectiveTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
