import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasViewComponent } from './atlas-view.component';

describe('AtlasViewComponent', () => {
  let component: AtlasViewComponent;
  let fixture: ComponentFixture<AtlasViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtlasViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
