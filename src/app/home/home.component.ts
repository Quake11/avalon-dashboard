import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Slide } from '../interfaces/slide';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides$: Observable<Array<Slide>>;
  slides: Array<Slide>;

  constructor(private afs: AngularFirestore, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.slides$ = this.afs.collection<Slide>('slides').valueChanges();

    this.slides$.subscribe(slides => {
      this.slides = slides;
      this.ref.markForCheck();
    });
  }
}
