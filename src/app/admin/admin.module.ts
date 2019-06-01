import { VisibilityButtonComponent } from './../shared/visibility-button/visibility-button.component';
import { UploadTaskComponent } from './uploader/upload-task/upload-task.component';
import { UploaderComponent } from './uploader/uploader.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SlidesIntervalComponent } from './slides-interval/slides-interval.component';
import { SlideComponent } from './slides-list/slide/slide.component';
import { SlidesListComponent } from './slides-list/slides-list.component';
import { ProgressBarComponent } from './uploader/progress-bar/progress-bar.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { AdminGuard } from '../guards/admin.guard';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HoldableDeleteComponent } from '../shared/holdable-delete/holdable-delete.component';
import { SafePipe } from '../pipes/safe.pipe';
import { DirectivesModule } from '../directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [LoggedInGuard, AdminGuard]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    SlidesIntervalComponent,
    SlidesIntervalComponent,
    SlidesListComponent,
    SlideComponent,
    UploaderComponent,
    ProgressBarComponent,
    UploadTaskComponent,
    HoldableDeleteComponent,
    SafePipe,
    VisibilityButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatSliderModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    DragDropModule,
    MatButtonModule,
    DirectivesModule
  ],
  providers: [AdminGuard]
})
export class AdminModule {}
