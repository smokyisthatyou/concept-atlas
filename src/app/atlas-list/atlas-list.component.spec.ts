import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasListComponent } from './atlas-list.component';

describe('AtlasListComponent', () => {
  let component: AtlasListComponent;
  let fixture: ComponentFixture<AtlasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtlasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
