import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, interval, Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state(
        'inactive',
        style({
          opacity: 0.8
        })
      ),
      state(
        'active',
        style({
          opacity: 1
        })
      ),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  slides$: Observable<Array<any>>;
  slides: Array<any>;

  slidesLength: number;
  autoPlaySub: Subscription;
  autoPlayInterval = 5000;

  currentSlide = 0;

  constructor(private afs: AngularFirestore, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.slides$ = this.afs.collection('slides').valueChanges();

    this.slides$.subscribe(slides => {
      this.slides = slides;
      this.ref.markForCheck();
    });

    this.autoPlaySub = interval(this.autoPlayInterval).subscribe(() => {
      this.nextSlide();
    });

  }

  nextSlide() {
    if (this.currentSlide === this.slides.length - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
    this.ref.markForCheck();
  }

  sortBy(prop: string) {
    return this.slides.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }
}
