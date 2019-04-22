import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { SlidesService } from 'src/app/slides.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadTaskComponent implements OnInit {
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  @Input() file: File;
  @Input() index: number;

  id: string;

  filename: string;
  fileExt: string;

  filenameFull: string;

  isImage: boolean;

  isVideo: boolean;
  isMuted = true;

  type: string;

  zoomed: boolean;

  localUrl: string | ArrayBuffer;

  task: AngularFireUploadTask;

  // percentage: Observable<number>;
  percent = 0;
  snapshot: Observable<any>;
  downloadURL: Promise<string>;

  pathDb: string;
  pathStorage: string;

  hover: boolean;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private ref: ChangeDetectorRef,
    private slides: SlidesService
  ) {}

  ngOnInit() {
    this.startUpload();
    this.readLocalUrl();
    this.isImage = this.file.type.includes('image');
    this.isVideo = this.file.type.includes('video');

    if (this.isImage) {
      this.type = 'image';
    }

    if (this.isVideo) {
      this.type = 'video';
    }

    this.filenameFull = this.file.name;
    const arrayName: Array<string> = this.file.name.split('.');

    const extension = arrayName.pop();
    this.fileExt = extension;

    let name = arrayName.join('.');

    if (name.length > 20) {
      name = name.substring(0, 20) + '...';
    }

    this.filename = name;
  }

  readLocalUrl() {
    const reader = new FileReader();

    reader.onload = () => {
      this.localUrl = reader.result;
      this.ref.detectChanges();
    };
    reader.readAsDataURL(this.file);
  }

  startUpload() {
    const name = this.file.name;

    // The storage path
    this.pathStorage = `slides/${Date.now()}_${name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(this.pathStorage);

    // The main task
    this.task = this.storage.upload(this.pathStorage, this.file);

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

        this.slides
          .add({
            downloadURL: await this.downloadURL,
            path: this.pathStorage,
            name,
            type: this.type || null,
            sort: 0
          })
          .then(result => {
            this.id = result.id;

            this.pathDb = result.path;
          });
      })
    );
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  toggleZoom() {
    this.zoomed = !this.zoomed;
  }

  get isLoading(): boolean {
    return this.percent < 100;
  }

  delete() {
    this.slides.delete(this.id, this.pathStorage);
    this.deleteEvent.emit(this.index);
  }
}
