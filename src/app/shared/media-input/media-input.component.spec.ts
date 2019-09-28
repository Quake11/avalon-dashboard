import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInputComponent } from './media-input.component';

describe('MediaInputComponent', () => {
  let component: MediaInputComponent;
  let fixture: ComponentFixture<MediaInputComponent>;

  beforeEach(async(() => {
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
