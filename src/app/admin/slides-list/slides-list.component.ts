import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-slides-list',
  templateUrl: './slides-list.component.html',
  styleUrls: ['./slides-list.component.scss']
})
export class SlidesListComponent implements OnInit {
  list$: Observable<any>;
  list: Array<any>;

  saved = true;

  constructor(private afs: AngularFirestore, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.list$ = this.afs.collection('slides').snapshotChanges().pipe(
      map(slides => {
        return slides.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));

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
      updates.push(this.afs.collection('slides').doc(this.list[i].id).update({ sort: this.list[i].sort }));
    }

    Promise.all(updates).then(() => {
      this.saved = true;
      this.ref.markForCheck();
    });

    console.log(this.list);
  }

  sortBy(prop: string) {
    return this.list.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }
}
