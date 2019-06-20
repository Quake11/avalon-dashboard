import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Slide } from '../interfaces/slide';
import { map } from 'rxjs/operators';
import { Foreground } from '../interfaces/foreground';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  slides$: Observable<Array<Slide>>;
  foregrounds$: Observable<Array<Foreground>>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.slides$ = this.afs
      .collection<Slide>('slides')
      .valueChanges()
      .pipe(
        map(slides => {
          return slides.filter(s => s.visible);
        })
      );

    this.foregrounds$ = this.afs
      .collection<Foreground>('foregrounds')
      .valueChanges()
      .pipe(
        map(foregrounds => {
          return foregrounds.filter(f => f.visible);
        })
      );
  }
}
