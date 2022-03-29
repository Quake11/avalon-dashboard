import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Foreground } from 'src/app/interfaces/foreground';


@Injectable({
  providedIn: 'root',
})
export class ForegroundsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  collection = 'foregrounds';

  add(foreground: {}): Promise<any> {
    return this.afs
      .collection(this.collection)
      .add({ ...foreground, visible: true });
  }

  get(id: string): Observable<Foreground> {
    return this.afs
      .collection<Foreground>(this.collection)
      .doc(id)
      .snapshotChanges();
  }

  getAll(): Observable<Foreground[]> {
    return this.afs
      .collection<Foreground>(this.collection)
      .snapshotChanges()
      .pipe(
        map(foregrounds => {
          return foregrounds.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
          // .filter(slide => !slide.visible);
        })
      );
  }

  getAllVisible(): Observable<Foreground[]> {
    return this.getAll().pipe(
      map(foregrounds => {
        return foregrounds.filter(s => s.visible);
      })
    );
  }

  update(id: string, data: {}): Promise<any> {
    return this.afs
      .collection<Foreground>(this.collection)
      .doc(id)
      .update(data);
  }

  delete(id: string, pathStorage: string): Promise<any> {
    const deleteFromDb = this.afs
      .collection<Foreground>(this.collection)
      .doc(id)
      .delete();
    const deleteFromStorage = this.storage
      .ref(pathStorage)
      .delete()
      .toPromise();

    return Promise.all([deleteFromStorage, deleteFromDb]);
  }
}
