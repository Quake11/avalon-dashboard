import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HoldableDeleteComponent } from './holdable-delete.component';

describe('HoldableDeleteComponent', () => {
  let component: HoldableDeleteComponent;
  let fixture: ComponentFixture<HoldableDeleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HoldableDeleteComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldableDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
