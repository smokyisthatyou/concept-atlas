import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapworkConfigComponent } from './mapwork-config.component';

describe('MapworkConfigComponent', () => {
  let component: MapworkConfigComponent;
  let fixture: ComponentFixture<MapworkConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapworkConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapworkConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
