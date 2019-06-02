import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapworkListComponent } from './mapwork-list.component';

describe('MapworkListComponent', () => {
  let component: MapworkListComponent;
  let fixture: ComponentFixture<MapworkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapworkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
