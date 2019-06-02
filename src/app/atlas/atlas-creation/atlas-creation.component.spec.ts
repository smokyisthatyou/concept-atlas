import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasCreationComponent } from './atlas-creation.component';

describe('AtlasCreationComponent', () => {
  let component: AtlasCreationComponent;
  let fixture: ComponentFixture<AtlasCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtlasCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
