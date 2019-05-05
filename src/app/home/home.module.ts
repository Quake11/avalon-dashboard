import { HomeComponent } from './home.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { InfoComponent } from './info/info.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, SliderComponent, InfoComponent],
  imports: [CommonModule, RouterModule.forChild(routes), AngularFirestoreModule]
})
export class HomeModule {}
