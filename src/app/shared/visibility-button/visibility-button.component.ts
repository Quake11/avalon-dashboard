import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-visibility-button',
  templateUrl: './visibility-button.component.html',
  styleUrls: ['./visibility-button.component.scss']
})
export class VisibilityButtonComponent implements OnInit {
  @Input() visible: boolean;
  @Output() changed = new EventEmitter<boolean>();

  wantHide: boolean;
  wantShow: boolean;

  constructor() {}

  ngOnInit() {}

  toggle() {
    if (this.visible === undefined) {
      this.changed.emit(false);
    } else {
      this.changed.emit(!this.visible);
    }
  }
}
