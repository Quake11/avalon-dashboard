import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Settings } from 'src/app/interfaces';
import { Slide } from 'src/app/interfaces/slide';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  collection = 'slides';

  slidesInterval$ = this.afs
    .collection('meta')
    .doc<Settings>('settings')
    .valueChanges()
    .pipe(
      filter(settings => !!settings),
      map(settings => settings.slidesInterval)
    );

  add(slide: Slide): Promise<any> {
    return this.afs
      .collection(this.collection)
      .add({ ...slide, visible: true });
  }

  get(id: string): Observable<Slide> {
    return this.afs
      .collection<Slide>(this.collection)
      .doc(id)
      .snapshotChanges();
  }

  getAll(): Observable<Slide[]> {
    return this.afs
      .collection<Slide>(this.collection)
      .snapshotChanges()
      .pipe(
        map(slides => {
          return slides.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
          // .filter(slide => !slide.visible);
        })
      );
  }

  getAllVisible(): Observable<Slide[]> {
    return this.getAll().pipe(
      map(slides => {
        return slides.filter(s => s.visible);
      })
    );
  }

  update(id: string, data: {}): Promise<any> {
    return this.afs
      .collection<Slide>(this.collection)
      .doc(id)
      .update(data);
  }

  delete(id: string, pathStorage?: string): Promise<any> {
    const deleteFromDb = this.afs
      .collection<Slide>(this.collection)
      .doc(id)
      .delete();

    if (pathStorage) {
      const deleteFromStorage = this.storage
        .ref(pathStorage)
        .delete()
        .toPromise();
      return Promise.all([deleteFromStorage, deleteFromDb]);
    }

    return deleteFromDb;
  }
}
