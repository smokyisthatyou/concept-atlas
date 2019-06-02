import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapworkViewComponent } from './mapwork-view.component';

describe('MapworkViewComponent', () => {
  let component: MapworkViewComponent;
  let fixture: ComponentFixture<MapworkViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapworkViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapworkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
