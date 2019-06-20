import { SafePipeModule } from './../../pipes/safe.pipe.module';
import { SliderComponent } from './slider.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, DragDropModule, SafePipeModule],
  exports: [SliderComponent]
})
export class SliderModule {}
