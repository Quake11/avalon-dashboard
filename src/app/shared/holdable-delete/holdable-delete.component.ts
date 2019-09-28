import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-holdable-delete',
  templateUrl: './holdable-delete.component.html',
  styleUrls: ['./holdable-delete.component.scss']
})
export class HoldableDeleteComponent implements OnInit {
  @Output() deleted: EventEmitter<void> = new EventEmitter();
  @Input() title: string;

  progress: number;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.title) {
      this.elementRef.nativeElement.classList.add('titled');
    }
  }

  delete(progress) {
    this.progress = progress;
    if (this.progress === 100) {
      this.deleted.emit();
    }
  }
}
