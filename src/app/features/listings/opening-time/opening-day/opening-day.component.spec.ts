import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningDayComponent } from './opening-day.component';

describe('OpeningDayComponent', () => {
  let component: OpeningDayComponent;
  let fixture: ComponentFixture<OpeningDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
