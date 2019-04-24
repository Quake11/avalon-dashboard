import { Component, OnInit, Input } from '@angular/core';
import { SlidesService } from 'src/app/slides.service';
import { Slide } from 'src/app/interfaces/slide';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],

})
export class SlideComponent implements OnInit {

  @Input() slide: Slide;

  constructor(private slides: SlidesService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  delete(isDeleted) {
    if (isDeleted) {
      this.slides.delete(this.slide.id, this.slide.path);
    }
  }

  fullscreenChange(checked: boolean) {
    this.slides.update(this.slide.id, { fullscreen: checked }).then(() =>
      this.snackBar.open('Сохранено', '', {
        duration: 1500,
      })
    );
  }
}
