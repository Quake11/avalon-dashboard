import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { SliderModule } from "./slider/slider.module";

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFirestoreModule,
    SliderModule
  ]
})
export class HomeModule {}
