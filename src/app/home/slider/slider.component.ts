import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { Observable, Subscription, interval, Subject, fromEvent } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DragRef } from '@angular/cdk/drag-drop';
import {
  ForegroundsService,
  SlidesService,
  UserService,
} from 'src/app/services';
import { Slide, Foreground } from 'src/app/interfaces/';
import {
  getFormattedDates,
  getPixelsFromPercentage,
  getPercentageFromPixels,
} from 'src/app/utils';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit, OnDestroy, OnChanges {
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
  autoPlaySub: Subscription;

  slidesInterval$: Observable<number>;
  currentSlide = 0;

  datetimeSub: Subscription;

  time: string;
  dateENG: string;
  dateRU: string;

  isAdmin$: Observable<boolean>;
  constructor(
    private ref: ChangeDetectorRef,
    private slidesService: SlidesService,
    private foregroundsService: ForegroundsService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.calculateForegroundsPositionsInPixels();
      });

    fromEvent(window, 'wheel')
      .pipe(throttleTime(200))
      .subscribe(scroll => {
        this.scrolledSubject.next(scroll as WheelEvent);
      });

    this.calculateForegroundsPositionsInPixels();
    this.isAdmin$ = this.userService.isAdmin;

    this.slidesService.slidesInterval$.subscribe(i => {
      this.autoPlay(i);
    });

    this.datetimeSub = interval(1000).subscribe(() => {
      this.setDate();
    });

    this.scrolledSubject.pipe(debounceTime(200)).subscribe(scrollEvent => {
      const { deltaY, shiftKey } = scrollEvent;
      let deltaScale = 0;
      const step = shiftKey ? 5 : 25;

      if (deltaY > 0) {
        deltaScale = -step;
      } else {
        deltaScale = +step;
      }
      this.updateWidth(deltaScale);
    });
  }

  ngOnChanges() {
    this.calculateForegroundsPositionsInPixels();
  }

  ngOnDestroy() {
    try {
      this.autoPlaySub.unsubscribe();
      this.datetimeSub.unsubscribe();
    } catch (error) {}
  }

  calculateForegroundsPositionsInPixels() {
    this.foregrounds.map(
      f => (f.positionPixels = getPixelsFromPercentage(f.positionPercents))
    );
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

  onSelectForeground(id: string) {
    this.currentDraggedForeground = this.foregrounds.find(f => f.id === id);
  }

  onUnSelectForeground() {
    this.currentDraggedForeground = null;
  }

  dragEnded(id: string, dragRef: DragRef) {
    const position = dragRef.getFreeDragPosition();
    const percentage = getPercentageFromPixels(position);

    this.updatePosition(id, { x: percentage.x, y: percentage.y });
    this.currentDraggedForeground = null;
  }

  updatePosition(id: string, positionPercents: { x: number; y: number }) {
    this.foregroundsService.update(id, { positionPercents }).then(() =>
      this.snackBar.open('Позиция сохранена', '', {
        duration: 500,
      })
    );
  }

  updateWidth(deltaWidth: number) {
    if (!this.currentDraggedForeground) {
      return;
    }
    const { id } = this.currentDraggedForeground;
    const defaultWidth = 300;
    const minimumWidth = 150;

    const currentWidth =
      this.foregrounds.find(f => f.id === id).width || defaultWidth;
    const newWidth = currentWidth + deltaWidth;

    if (newWidth < minimumWidth) {
      this.snackBar.open(
        `Слишком мелко. Миниммаяльная ширина - ${minimumWidth}px`,
        '',
        {
          duration: 2000,
        }
      );
      return;
    }
    this.foregroundsService
      .update(id, {
        width: newWidth,
      })
      .then(() =>
        this.snackBar.open('Масштаб сохранён', '', {
          duration: 1500,
        })
      );
  }

  trackByFn(index, slide) {
    return slide.id;
  }
}
