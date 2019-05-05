import { HoldableDirective } from './holdable/holdable.directive';
import { NgModule } from '@angular/core';
import { DropzoneDirective } from './dropzone/dropzone.directive';

@NgModule({
  declarations: [DropzoneDirective, HoldableDirective],
  exports: [DropzoneDirective, HoldableDirective]
})
export class DirectivesModule {}
