import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-media-input',
  templateUrl: './media-input.component.html',
  styleUrls: ['./media-input.component.scss']
})
export class MediaInputComponent implements OnInit {
  @Output() addMedia: EventEmitter<string> = new EventEmitter();

  value: string;

  constructor() {}

  ngOnInit() {}

  onUrlAdd() {
    this.addMedia.emit(this.value);
    this.value = null;
  }
}
