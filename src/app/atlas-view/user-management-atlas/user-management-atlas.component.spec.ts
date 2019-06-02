import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementAtlasComponent } from './user-management-atlas.component';

describe('UserManagementAtlasComponent', () => {
  let component: UserManagementAtlasComponent;
  let fixture: ComponentFixture<UserManagementAtlasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementAtlasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementAtlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
