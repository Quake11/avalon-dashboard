import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collection = 'users';
  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.getData(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  getData(id: string): Observable<User> {
    return this.afs
      .collection(this.collection)
      .doc<User>(id)
      .valueChanges();
  }

  get isAdmin(): Observable<boolean> {
    return this.user$.pipe(
      map(user => {
        if (user) {
          return user.admin;
        } else {
          return false;
        }
      })
    );
  }
}
