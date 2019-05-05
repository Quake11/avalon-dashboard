import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-holdable-delete',
  templateUrl: './holdable-delete.component.html',
  styleUrls: ['./holdable-delete.component.scss']
})
export class HoldableDeleteComponent implements OnInit {
  @Output() deleted: EventEmitter<boolean> = new EventEmitter();

  progress: number;

  constructor() {}

  ngOnInit() {}

  delete(progress) {
    this.progress = progress;
    if (progress >= 110) {
      this.deleted.emit(true);
      this.progress = 0;
    }
  }
}
