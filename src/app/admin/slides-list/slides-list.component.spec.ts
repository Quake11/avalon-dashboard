import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlidesListComponent } from './slides-list.component';

describe('SlidesListComponent', () => {
  let component: SlidesListComponent;
  let fixture: ComponentFixture<SlidesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
