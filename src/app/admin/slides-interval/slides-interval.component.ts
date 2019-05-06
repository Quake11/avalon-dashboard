import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Settings } from 'src/app/interfaces/settings';

@Component({
  selector: 'app-slides-interval',
  templateUrl: './slides-interval.component.html',
  styleUrls: ['./slides-interval.component.scss']
})
export class SlidesIntervalComponent implements OnInit {
  saved: boolean;
  value$: Observable<number>;

  constructor(private afs: AngularFirestore, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.value$ = this.afs
      .collection('meta')
      .doc<Settings>('settings')
      .valueChanges()
      .pipe(
        map(settings => {
          if (!settings) {
            this.afs
              .collection('meta')
              .doc<Settings>('settings')
              .set({ slidesInterval: 5000 });
          } else {
            return settings.slidesInterval / 1000;
          }
        })
      );
  }

  onChange(event: MatSliderChange) {
    this.saved = false;
    this.afs
      .collection('meta')
      .doc<Settings>('settings')
      .update({ slidesInterval: event.value * 1000 })
      .then(() => {
        this.saved = true;
        this.ref.markForCheck();
      });
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value % 60 === 0) {
      return value / 60 + 'м';
    }

    return value + 'с';
  }
}
