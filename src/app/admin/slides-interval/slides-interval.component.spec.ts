import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlidesIntervalComponent } from './slides-interval.component';

describe('SlidesIntervalComponent', () => {
  let component: SlidesIntervalComponent;
  let fixture: ComponentFixture<SlidesIntervalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesIntervalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
