import { DragRef } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, interval, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, map, takeUntil, throttleTime } from 'rxjs/operators';
import { Foreground, Slide } from 'src/app/interfaces/';
import {
  ForegroundsService,
  SlidesService,
  UserService
} from 'src/app/services';
import {
  Flight,
  FlightsService
} from 'src/app/services/flights/flights.service';
import {
  FormattedDate,
  getFormattedDates,
  getPercentageFromPixels,
  getPixelsFromPercentage
} from 'src/app/utils';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  autoPlaySub: Subscription;

  slidesInterval$: Observable<number>;
  currentSlide = 0;

  datetimeData$: Observable<FormattedDate>;
  flights$: Observable<Flight[]>;

  isAdmin$: Observable<boolean>;

  private scrolledSubject: Subject<WheelEvent> = new Subject<WheelEvent>();
  private destroyed$: Subject<void> = new Subject();
  constructor(
    private ref: ChangeDetectorRef,
    private slidesService: SlidesService,
    private foregroundsService: ForegroundsService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private flights: FlightsService
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

    this.datetimeData$ = interval(1000).pipe(
      map(() => {
        return getFormattedDates();
      })
    );

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
    this.flights$ = this.flights.flightsRealtime$;
  }

  ngOnChanges() {
    this.calculateForegroundsPositionsInPixels();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  calculateForegroundsPositionsInPixels() {
    this.foregrounds.map(
      f => (f.positionPixels = getPixelsFromPercentage(f.positionPercents))
    );
  }

  autoPlay(i) {
    if (this.autoPlaySub) {
      this.autoPlaySub.unsubscribe();
    }
    this.autoPlaySub = interval(i)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
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
        duration: 500
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
          duration: 2000
        }
      );
      return;
    }
    this.foregroundsService
      .update(id, {
        width: newWidth
      })
      .then(() =>
        this.snackBar.open('Масштаб сохранён', '', {
          duration: 1500
        })
      );
  }

  trackBySlideId(index, slide) {
    return slide.id;
  }

  trackByFlightThreadUid(index, flight: Flight) {
    return flight.thread.uid;
  }
}
