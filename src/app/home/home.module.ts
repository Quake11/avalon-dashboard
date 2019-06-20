import { HomeComponent } from './home.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SliderModule } from './slider/slider.module';
import { InfoModule } from './info/info.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFirestoreModule,
    SliderModule,
    InfoModule
  ]
})
export class HomeModule {}
