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
import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { SlidesService } from 'src/app/services/slides/slides.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadTaskComponent implements OnInit {
  @Output() done = new EventEmitter<{
    url: string;
    path: string;
    name: string;
  }>();
  @Output() delete: EventEmitter<number> = new EventEmitter();

  @Input() file!: File;
  @Input() storageFolder!: string;

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
  downloadURL: string;

  pathDb: string;
  pathStorage: string;

  hover: boolean;

  uploadedFileSub: Subscription;

  constructor(
    private ref: ChangeDetectorRef,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    console.log('task init');

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
      this.ref.markForCheck();
    };
    reader.readAsDataURL(this.file);
  }

  startUpload() {
    console.log('startUpload');

    const name = this.file.name;

    // The storage path
    this.pathStorage = `${this.storageFolder}/${Date.now()}_${name}`;
    console.log(this.pathStorage);

    // Reference to storage bucket
    const ref = this.storage.ref(this.pathStorage);

    // The main task
    this.task = this.storage.upload(this.pathStorage, this.file);

    // Progress monitoring
    // this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(task => {
        this.percent = Math.round(
          (task.bytesTransferred / task.totalBytes) * 100
        );
        this.ref.detectChanges();
      }),
      // The file's download URL
      finalize(async () => {
        console.log('finalize');

        this.downloadURL = await ref.getDownloadURL().toPromise();
        console.log(this.downloadURL);

        this.done.emit({
          url: this.downloadURL,
          path: this.pathStorage,
          name
        });
        // console.log(this.downloadURL);
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

  onDelete(deleting: boolean) {
    console.log('delete');

    if (deleting) {
      this.storage.ref(this.pathStorage).delete();
      this.delete.emit();
    }
  }
}
