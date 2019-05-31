import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
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

  add(slide: {}): Promise<any> {
    return this.afs
      .collection(this.collection)
      .add({ ...slide, visible: true });
  }

  get(id: string): Observable<any> {
    return this.afs
      .collection<Slide>(this.collection)
      .doc(id)
      .snapshotChanges();
  }

  getAll(): Observable<any> {
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

  update(id: string, data: {}): Promise<any> {
    return this.afs
      .collection<Slide>(this.collection)
      .doc(id)
      .update(data);
  }

  delete(id: string, pathStorage: string): Promise<any> {
    const deleteFromDb = this.afs
      .collection<Slide>(this.collection)
      .doc(id)
      .delete();
    const deleteFromStorage = this.storage
      .ref(pathStorage)
      .delete()
      .toPromise();

    return Promise.all([deleteFromStorage, deleteFromDb]);
  }
}
