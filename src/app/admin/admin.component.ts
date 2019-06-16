import { SlidesService } from 'src/app/services/slides/slides.service';
import { ForegroundsService } from 'src/app/services/foregrounds/foregrounds.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private slides: SlidesService,
    private foregrounds: ForegroundsService
  ) {}

  ngOnInit() {}

  signOut() {
    this.auth.auth.signOut().then(() => this.router.navigate(['/login']));
  }

  onUploadSlideDone(upload) {
    console.log(upload);
    this.slides.add({
      downloadURL: upload.url,
      path: upload.path,
      name: upload.name,
      type: upload.type,
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
}
