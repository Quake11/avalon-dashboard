import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InfoModule } from "../info/info.module";
import { SafePipeModule } from "./../../pipes/safe.pipe.module";
import { SliderComponent } from "./slider.component";

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, DragDropModule, SafePipeModule, InfoModule],
  exports: [SliderComponent]
})
export class SliderModule {}
