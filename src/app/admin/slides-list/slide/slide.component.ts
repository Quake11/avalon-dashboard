import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Slide } from 'src/app/interfaces/slide';
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

  onDelete() {
    this.slides.delete(this.slide.id);
  }

  fullscreenChange(checked: boolean) {
    this.slides.update(this.slide.id, { fullscreen: checked }).then(() =>
      this.snackBar.open('Сохранено', '', {
        duration: 1500
      })
    );

    if (!checked) {
      this.hidetimeChange(false);
    }
  }

  hidetimeChange(checked: boolean) {
    this.slides.update(this.slide.id, { hidetime: checked }).then(() =>
      this.snackBar.open('Сохранено', '', {
        duration: 1500
      })
    );
  }

  visibilityChange(visible: boolean) {
    this.slides.update(this.slide.id, { visible }).then(() =>
      this.snackBar.open('Сохранено', '', {
        duration: 1500
      })
    );
  }
}
