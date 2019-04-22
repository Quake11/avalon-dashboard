import {
  Directive,
  HostListener,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { Observable, Subject, interval, Subscription } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[appHoldable]'
})
export class HoldableDirective implements OnDestroy {
  @Output() holdTime: EventEmitter<number> = new EventEmitter();

  state: Subject<string> = new Subject();

  cancel: Observable<string>;

  sub: Subscription;

  constructor() {
    this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v => {
        console.log('%c stopped hold', 'color: #ec6969; font-weight: bold;');
        this.holdTime.emit(0);
      })
    );
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('touchend', ['$event'])
  onExit() {
    this.state.next('cancel');
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onHold() {
    console.log('%c started hold', 'color: #5fba7d; font-weight: bold;');

    this.state.next('start');

    const n = 100; // step in ms

    this.sub = interval(n)
      .pipe(
        takeUntil(this.cancel),
        tap(v => {
          const progress = (v * n) / 25;
          this.holdTime.emit(progress);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
