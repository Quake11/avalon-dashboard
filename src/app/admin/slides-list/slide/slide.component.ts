import { Component, OnInit, Input } from '@angular/core';
import { SlidesService } from 'src/app/slides.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],

})
export class SlideComponent implements OnInit {

  @Input() slide: any;

  constructor(private slides: SlidesService) { }

  ngOnInit() {
  }

  delete(isDeleted) {
    if (isDeleted) {
      this.slides.delete(this.slide.id, this.slide.path);
    }
  }
}
