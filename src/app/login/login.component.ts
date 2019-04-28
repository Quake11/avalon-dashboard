import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private afa: AngularFireAuth) { }

  auth: Observable<any>;

  ngOnInit() {
    this.auth = this.afa.authState;
  }



  printUser(event) {
    console.log(event);
  }

  printError(event) {
    console.error(event);
  }
}
