import { ForegroundsService, SlidesService } from 'src/app/services';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Slide } from '../../interfaces/slide';
import { Observable, Subscription, interval, Subject } from 'rxjs';
import { Foreground } from 'src/app/interfaces/foreground';
import { getFormattedDates } from 'src/app/utils/date';
import { debounceTime } from 'rxjs/operators';
import { CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() slides: Array<Slide>;
  @Input() foregrounds: Array<Foreground>;

  get slidesSorted() {
    return this.slides.sort((a, b) =>
      a.sort > b.sort ? 1 : a.sort === b.sort ? 0 : -1
    );
  }

  get foregroundsSorted() {
    return this.foregrounds.sort((a, b) =>
      a.sort > b.sort ? 1 : a.sort === b.sort ? 0 : -1
    );
  }

  currentDraggedForeground: Foreground;

  private scrolledSubject: Subject<WheelEvent> = new Subject<WheelEvent>();
  private dragMovedSubject: Subject<{
    event: CdkDragMove;
    id: string;
  }> = new Subject<{
    event: CdkDragMove;
    id: string;
  }>();

  autoPlaySub: Subscription;

  slidesInterval$: Observable<number>;
  currentSlide = 0;

  datetimeSub: Subscription;

  time: string;
  dateENG: string;
  dateRU: string;

  constructor(
    private ref: ChangeDetectorRef,
    private slidesService: SlidesService,
    private foregroundsService: ForegroundsService
  ) {}

  ngOnInit() {
    this.slidesService.slidesInterval$.subscribe(i => {
      this.autoPlay(i);
    });

    this.datetimeSub = interval(1000).subscribe(() => {
      this.setDate();
    });

    console.log(this.slides);
    console.log(this.foregrounds);

    this.scrolledSubject.subscribe(scrollEvent => {
      const { deltaY } = scrollEvent;
      let deltaScale = 0;
      if (deltaY > 0) {
        console.log('reduce');
        deltaScale = -0.05;
      } else {
        console.log('increase');
        deltaScale = +0.05;
      }
      this.updateScale(deltaScale);
    });

    this.dragMovedSubject.pipe(debounceTime(500)).subscribe(subj => {
      const { x, y } = subj.event.distance;
      this.updatePosition(subj.id, x, y);
      console.log(subj.event.distance);
    });
  }

  ngOnDestroy() {
    try {
      this.autoPlaySub.unsubscribe();
      this.datetimeSub.unsubscribe();
    } catch (error) {}
  }

  setDate() {
    const { time, dateENG, dateRU } = getFormattedDates();
    this.time = time;
    this.dateENG = dateENG;
    this.dateRU = dateRU;
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

  trackByFn(index, slide) {
    return slide.id;
  }

  dragStarted(id: string) {
    this.currentDraggedForeground = this.foregrounds.find(f => f.id === id);
  }

  dragEnded(event) {
    console.log(event);

    this.currentDraggedForeground = null;
  }

  updatePosition(id: string, x: number, y: number) {
    this.foregroundsService.update(id, {
      x,
      y
    });
  }

  updateScale(deltaScale: number) {
    const { id } = this.currentDraggedForeground;
    const currentScale = this.foregrounds.find(f => f.id === id).scale || 1;
    const newScale = currentScale + deltaScale;
    this.foregroundsService.update(id, {
      scale: newScale
    });
  }

  onScroll(scroll: WheelEvent) {
    this.scrolledSubject.next(scroll);
  }

  dragMoved(event: CdkDragMove, id) {
    this.dragMovedSubject.next({ event, id });
  }
}
