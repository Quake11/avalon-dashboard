import {
  AngularFireStorage,
  AngularFireStorageModule
} from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreModule
} from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HoldableDeleteComponent } from './../shared/holdable-delete/holdable-delete.component';
import { UploaderComponent } from './uploader/uploader.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { SlidesListComponent } from './slides-list/slides-list.component';
import { SlidesIntervalComponent } from './slides-interval/slides-interval.component';
import { UploadTaskComponent } from './uploader/upload-task/upload-task.component';
import { SlideComponent } from './slides-list/slide/slide.component';
import { SafePipe } from '../pipes/safe.pipe';
import { ProgressBarComponent } from './uploader/progress-bar/progress-bar.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  const AngularFireMocks = {
    auth: of({ uid: 'ABC123' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent,
        UploaderComponent,
        SlidesListComponent,
        SlidesIntervalComponent,
        UploadTaskComponent,
        SlideComponent,
        SafePipe,
        HoldableDeleteComponent,
        ProgressBarComponent
      ],
      imports: [
        MatTooltipModule,
        MatChipsModule,
        MatSliderModule,
        MatIconModule,
        MatMenuModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule
      ],
      providers: [
        AngularFireAuth,
        AngularFirestore,
        AngularFireStorage,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
