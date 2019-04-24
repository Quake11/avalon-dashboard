import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Slide } from './interfaces/slide';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  add(slide: {}): Promise<any> {
    return this.afs.collection('slides').add(slide);
  }

  get(id: string): Observable<any> {
    return this.afs.collection<Slide>('slides').doc(id).snapshotChanges();
  }

  getAll(): Observable<any> {
    return this.afs.collection<Slide>('slides').snapshotChanges().pipe(
      map(slides => {
        return slides.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );;
  }

  update(id: string, data: {}): Promise<any> {
    return this.afs
      .collection<Slide>('slides')
      .doc(id)
      .update(data);
  }

  delete(id: string, pathStorage: string): Promise<any> {
    const deleteFromDb = this.afs
      .collection<Slide>('slides')
      .doc(id)
      .delete();
    const deleteFromStorage = this.storage
      .ref(pathStorage)
      .delete()
      .toPromise();

    return Promise.all([deleteFromStorage, deleteFromDb]);
  }
}
