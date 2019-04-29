import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private afa: AngularFireAuth, private router: Router) {}

  auth: Observable<any>;

  ngOnInit() {
    this.auth = this.afa.authState;
  }

  success(event) {
    console.log(event);
    this.router.navigate(['admin']);
  }

  error(event) {
    console.error(event);
  }
}
