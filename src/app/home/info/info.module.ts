import { InfoComponent } from './info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, MatIconModule],
  exports: [InfoComponent]
})
export class InfoModule {}
