import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPagesComponent } from './support-pages.component';

describe('SupportPagesComponent', () => {
  let component: SupportPagesComponent;
  let fixture: ComponentFixture<SupportPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
