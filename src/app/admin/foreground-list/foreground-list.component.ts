import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, Subscription } from 'rxjs';
import {
  trigger,
  transition,
  animate,
  style,
  sequence
} from '@angular/animations';
import { Foreground } from 'src/app/interfaces/foreground';
import { ForegroundsService } from 'src/app/services/foregrounds/foregrounds.service';

@Component({
  selector: 'app-foreground-list',
  templateUrl: './foreground-list.component.html',
  styleUrls: ['./foreground-list.component.scss'],
  animations: [
    trigger('delete', [
      transition('* => void', [
        sequence([
          animate(
            '250ms ease-out',
            style({
              opacity: 0.9,
              transform: 'perspective(500px) translate3d(0, 0, -50px)'
            })
          ),
          animate(
            '300ms ease-out',
            style({
              opacity: 0,
              transform: 'perspective(500px) translate3d(-150px, 0, -50px)'
            })
          )
        ])
      ])
    ])
  ]
})
export class ForegroundListComponent implements OnInit, OnDestroy {
  list$: Observable<Foreground[]>;
  list: Foreground[];
  listSub: Subscription;

  saved: boolean;

  constructor(
    private ref: ChangeDetectorRef,
    private foregrounds: ForegroundsService
  ) {}

  ngOnInit() {
    this.list$ = this.foregrounds.getAll();

    this.listSub = this.list$.subscribe(value => {
      this.list = value;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.listSub) {
      this.listSub.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    if (event.currentIndex === event.previousIndex) {
      return;
    }
    this.saved = false;

    const originalArray = [...this.list];
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    const newArray = [...this.list];

    const updates: Array<Promise<any>> = [];

    // save only slides that changed order
    for (let i = 0; i < originalArray.length; i++) {
      const originalElement = originalArray[i];
      const newElement = newArray[i];

      if (originalElement.id !== newElement.id) {
        this.list[i].sort = i;
        updates.push(
          this.foregrounds.update(this.list[i].id, {
            sort: this.list[i].sort
          })
        );
      }
    }

    Promise.all(updates).then(() => {
      console.log('saved foregrounds order');

      this.saved = true;
      this.ref.markForCheck();
    });
  }

  sortBy(prop: string) {
    return this.list.sort((a, b) =>
      a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1
    );
  }

  trackByFn(index, slide) {
    return slide.id;
  }
}
