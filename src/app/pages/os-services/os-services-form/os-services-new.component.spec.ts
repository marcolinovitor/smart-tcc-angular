import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsServicesNewComponent } from './os-services-new.component';

describe('OsServicesNewComponent', () => {
  let component: OsServicesNewComponent;
  let fixture: ComponentFixture<OsServicesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsServicesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsServicesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
