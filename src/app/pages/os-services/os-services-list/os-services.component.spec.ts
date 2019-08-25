import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsServicesComponent } from './os-services.component';

describe('OsServicesComponent', () => {
  let component: OsServicesComponent;
  let fixture: ComponentFixture<OsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
