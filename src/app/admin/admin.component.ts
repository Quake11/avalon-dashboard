import { SlidesService, ForegroundsService } from 'src/app/services';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
}
