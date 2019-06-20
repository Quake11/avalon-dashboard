import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Slide } from '../../interfaces/slide';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Settings } from '../../interfaces/settings';
import { Foreground } from 'src/app/interfaces/foreground';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() slides: Array<Slide>;
  @Input() foregrounds: Array<Foreground>;

  autoPlaySub: Subscription;

  slidesInterval: number;
  slidesInterval$: Observable<number>;
  currentSlide = 0;

  datetimeSub: Subscription;
  dateRU: string;
  dateENG: string;
  time: string;

  daysOfWeek = {
    ru: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    eng: ['Sun', 'Mon', 'Tues', 'Wed', 'thurs', 'Fri', 'Sat'],
  };

  months = {
    ru: [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Ноября',
      'Декабря',
    ],
    eng: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  };

  constructor(private afs: AngularFirestore, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.slidesInterval$ = this.afs
      .collection('meta')
      .doc<Settings>('settings')
      .valueChanges()
      .pipe(
        filter(settings => !!settings),
        map(settings => settings.slidesInterval)
      );
    this.slidesInterval$.subscribe(i => {
      this.slidesInterval = i;
      this.autoPlay(i);
    });

    this.datetimeSub = interval(1000).subscribe(() => {
      this.setDate();
    });

    console.log(this.foregrounds);
  }

  ngOnDestroy() {
    try {
      this.autoPlaySub.unsubscribe();
      this.datetimeSub.unsubscribe();
    } catch (error) {}
  }

  setDate() {
    const dateRef = new Date();

    const dayOfWeekRU = this.daysOfWeek.ru[dateRef.getDay()];
    const dayOfWeekENG = this.daysOfWeek.eng[dateRef.getDay()];
    const day = dateRef.getDate().toString();
    const year = dateRef.getFullYear().toString();
    const monthRU = this.months.ru[dateRef.getMonth()];
    const monthENG = this.months.eng[dateRef.getMonth()];

    let hours: string = dateRef.getHours().toString();
    if (dateRef.getHours() < 10) {
      hours = '0' + hours.toString();
    }

    let minutes: string = dateRef.getMinutes().toString();
    if (dateRef.getMinutes() < 10) {
      minutes = '0' + minutes.toString();
    }

    this.time = `${hours}:${minutes}`;
    this.dateRU = `${dayOfWeekRU}, ${day} ${monthRU} ${year} года`;
    this.dateENG = `${dayOfWeekENG}, the ${day} of ${monthENG}, ${year}`;

    this.ref.markForCheck();
  }

  autoPlay(i) {
    if (this.autoPlaySub) {
      this.autoPlaySub.unsubscribe();
    }
    this.autoPlaySub = interval(i).subscribe(() => {
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

  sortSlides(prop: string) {
    return this.slides
      .filter(slide => slide.type === 'video' || slide.type === 'image')
      .sort((a, b) => (a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1));
  }

  trackByFn(index, slide) {
    return slide.id;
  }
}
