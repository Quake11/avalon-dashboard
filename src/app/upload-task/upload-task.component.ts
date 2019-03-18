import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;

  isImage: boolean;
  localUrl: string | ArrayBuffer;

  task: AngularFireUploadTask;

  // percentage: Observable<number>;
  percent: number = 0;
  snapshot: Observable<any>;
  downloadURL: Promise<string>;

  hover: boolean;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.startUpload();
    this.readLocalUrl();
    this.isImage = this.file.type.includes('image');
  }

  readLocalUrl() {
    const reader = new FileReader();

    reader.onload = () => (this.localUrl = reader.result);
    reader.readAsDataURL(this.file);
  }

  startUpload() {
    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    // this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      tap(task => {
        this.percent = Math.round(
          (task.bytesTransferred / task.totalBytes) * 100
        );
        this.ref.detectChanges();
      }),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = ref.getDownloadURL().toPromise();
        // console.log(this.downloadURL);

        this.db
          .collection('files')
          .add({ downloadURL: await this.downloadURL, path });
      })
    );
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
