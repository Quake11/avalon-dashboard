import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Foreground } from 'src/app/interfaces/foreground';
import { ForegroundsService } from 'src/app/services/foregrounds/foregrounds.service';

@Component({
  selector: 'app-foreground-item',
  templateUrl: './foreground-item.component.html',
  styleUrls: ['./foreground-item.component.scss']
})
export class ForegroundItemComponent implements OnInit {
  @Input() foreground: Foreground;

  constructor(
    private foregrounds: ForegroundsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onDelete() {
    this.foregrounds.delete(this.foreground.id, this.foreground.path);
  }

  fullscreenChange(checked: boolean) {
    this.foregrounds
      .update(this.foreground.id, { fullscreen: checked })
      .then(() =>
        this.snackBar.open('Сохранено', '', {
          duration: 1500
        })
      );

    if (!checked) {
      this.hidetimeChange(false);
    }
  }

  hidetimeChange(checked: boolean) {
    this.foregrounds
      .update(this.foreground.id, { hidetime: checked })
      .then(() =>
        this.snackBar.open('Сохранено', '', {
          duration: 1500
        })
      );
  }

  visibilityChange(visible: boolean) {
    this.foregrounds.update(this.foreground.id, { visible }).then(() =>
      this.snackBar.open('Сохранено', '', {
        duration: 1500
      })
    );
  }
}
