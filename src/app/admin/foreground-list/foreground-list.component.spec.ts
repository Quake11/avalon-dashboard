import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForegroundListComponent } from './foreground-list.component';

describe('ForegroundListComponent', () => {
  let component: ForegroundListComponent;
  let fixture: ComponentFixture<ForegroundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForegroundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForegroundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
