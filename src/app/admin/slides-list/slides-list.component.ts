import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SlidesService } from 'src/app/slides.service';
import { trigger, transition, animate, style, sequence } from '@angular/animations';

@Component({
  selector: 'app-slides-list',
  templateUrl: './slides-list.component.html',
  styleUrls: ['./slides-list.component.scss'],
  animations: [
    trigger('delete', [
      transition('* => void', [
        sequence([
          animate('250ms ease-out', style({
            opacity: 0.9,
            transform: 'perspective(500px) translate3d(0, 0, -50px)'
          })),
          animate('300ms ease-out', style({
            opacity: 0,
            transform: 'perspective(500px) translate3d(-150px, 0, -50px)'
          }))
        ])

      ])
    ])
  ]
})
export class SlidesListComponent implements OnInit {
  list$: Observable<any>;
  list: Array<any>;

  saved: boolean;

  constructor(
    private afs: AngularFirestore,
    private ref: ChangeDetectorRef,
    private slides: SlidesService
  ) { }

  ngOnInit() {
    this.list$ = this.slides.getAll();

    this.list$.subscribe(value => {
      this.list = value;
      this.ref.markForCheck();
    });
  }

  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    if (event.currentIndex === event.previousIndex) {
      return;
    }

    this.saved = false;
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);

    const updates: Array<Promise<any>> = [];

    for (let i = 0; i < this.list.length; i++) {
      this.list[i].sort = i;
      updates.push(
        this.slides.update(this.list[i].id, { sort: this.list[i].sort })
      );
    }

    Promise.all(updates).then(() => {
      this.saved = true;
      this.ref.markForCheck();
    });

    console.log(this.list);
  }

  sortBy(prop: string) {
    return this.list.sort((a, b) =>
      a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1
    );
  }

  trackByFn(index, slide) {
    return slide.id; // or item.id
  }
}
