import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './admin/uploader/uploader.component';
import { UploadTaskComponent } from './admin/uploader/upload-task/upload-task.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SafePipe } from './safe.pipe';
import { ProgressBarComponent } from './admin/uploader/progress-bar/progress-bar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { SlidesListComponent } from './admin/slides-list/slides-list.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SlidesIntervalComponent } from './admin/slides-interval/slides-interval.component';

@NgModule({
  declarations: [
    AppComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    SafePipe,
    ProgressBarComponent,
    SlidesListComponent,
    AdminComponent,
    HomeComponent,
    SlidesIntervalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    BrowserAnimationsModule, // imports firebase/storage only needed for storage features
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    DragDropModule,
    MatPasswordStrengthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
