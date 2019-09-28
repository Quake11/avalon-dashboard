import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { ForegroundsService, SlidesService } from 'src/app/services';
import { DirectivesModule } from '../directives/directives.module';
import { AdminGuard } from '../guards/admin.guard';
import { SafePipeModule } from '../pipes/safe.pipe.module';
import { HoldableDeleteComponent } from '../shared/holdable-delete/holdable-delete.component';
import { MediaInputComponent } from '../shared/media-input/media-input.component';
import { VisibilityButtonComponent } from './../shared/visibility-button/visibility-button.component';
import { AdminComponent } from './admin.component';
import { ForegroundItemComponent } from './foreground-list/foreground-item/foreground-item.component';
import { ForegroundListComponent } from './foreground-list/foreground-list.component';
import { SlidesIntervalComponent } from './slides-interval/slides-interval.component';
import { SlideComponent } from './slides-list/slide/slide.component';
import { SlidesListComponent } from './slides-list/slides-list.component';
import { ProgressBarComponent } from './uploader/progress-bar/progress-bar.component';
import { UploadTaskComponent } from './uploader/upload-task/upload-task.component';
import { UploaderComponent } from './uploader/uploader.component';

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
    VisibilityButtonComponent,
    ForegroundListComponent,
    ForegroundItemComponent,
    MediaInputComponent
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
    MatSnackBarModule,
    DirectivesModule,
    SafePipeModule,
    MatInputModule,
    FormsModule
  ],
  providers: [AdminGuard, ForegroundsService, SlidesService]
})
export class AdminModule {}
