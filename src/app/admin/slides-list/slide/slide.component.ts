import { Component, OnInit, Input } from '@angular/core';
import { Slide } from 'src/app/interfaces/slide';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlidesService } from 'src/app/services/slides/slides.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  @Input() slide: Slide;

  constructor(private slides: SlidesService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  delete(isDeleted) {
    if (isDeleted) {
      this.slides.delete(this.slide.id, this.slide.path);
    }
  }

  fullscreenChange(checked: boolean) {
    this.slides.update(this.slide.id, { fullscreen: checked }).then(() =>
      this.snackBar.open('Сохранено', '', {
        duration: 1500
      })
    );
  }

  hidetimeChange(checked: boolean) {
    this.slides.update(this.slide.id, { hidetime: checked }).then(() =>
      this.snackBar.open('Сохранено', '', {
        duration: 1500
      })
    );
  }
}
