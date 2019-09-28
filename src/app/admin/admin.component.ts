import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ForegroundsService, SlidesService } from 'src/app/services';
import { getMediaUrlType, getYoutubeVideoId } from 'src/app/utils';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  get foregrounds$() {
    return this.foregrounds.getAllVisible();
  }

  get slides$() {
    return this.slides.getAllVisible();
  }

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private slides: SlidesService,
    private foregrounds: ForegroundsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  signOut() {
    this.auth.auth.signOut().then(() => this.router.navigate(['/login']));
  }

  onUploadSlideDone(upload: {
    url: string;
    path: string;
    name: string;
    type: string;
  }) {
    const { url, path, name, type } = upload;
    console.log(upload);
    this.slides.add({
      downloadURL: url,
      path,
      name,
      type,
      sort: 0
    });
  }

  onUploadForegroundDone(upload) {
    console.log(upload);
    this.foregrounds.add({
      downloadURL: upload.url,
      path: upload.path,
      name: upload.name,
      type: upload.type,
      sort: 0
    });
  }

  onUploadError(err) {
    console.log(err);

    this.snackBar.open(err, '', {
      duration: 5000
    });
  }

  onMediaAdd(youtubeUrl: string) {
    const type = getMediaUrlType(youtubeUrl);
    console.log(type);

    const youtubeId = getYoutubeVideoId(youtubeUrl);
    console.log(youtubeId);

    if (type !== null) {
      this.slides
        .add({
          youtubeUrl,
          youtubeId,
          name: youtubeUrl,
          type,
          sort: 0
        })
        .then(() => {
          this.snackBar.open('Медиа успешно добавлено', '', {
            duration: 3000
          });
        });
    } else {
      this.snackBar.open('Неизвестный тип медиа!', '', {
        duration: 5000
      });
    }
  }
}
