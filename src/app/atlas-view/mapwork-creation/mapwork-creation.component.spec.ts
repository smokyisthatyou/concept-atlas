import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapworkCreationComponent } from './mapwork-creation.component';

describe('MapworkCreationComponent', () => {
  let component: MapworkCreationComponent;
  let fixture: ComponentFixture<MapworkCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapworkCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapworkCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
