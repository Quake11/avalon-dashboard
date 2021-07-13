import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediaInputComponent } from './media-input.component';

describe('MediaInputComponent', () => {
  let component: MediaInputComponent;
  let fixture: ComponentFixture<MediaInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
