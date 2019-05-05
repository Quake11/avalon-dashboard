import { UserService } from '../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthProvider } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private afa: AngularFireAuth,
    private router: Router,
    private user: UserService
  ) {}

  auth$: Observable<any>;
  isAdmin$: Observable<boolean>;

  providers = AuthProvider;

  ngOnInit() {
    this.auth$ = this.afa.authState;
    this.isAdmin$ = this.user.isAdmin;
  }

  success() {
    console.log('success');
    this.isAdmin$.subscribe(adm => {
      if (adm) {
        this.router.navigate(['/admin']);
      }
    });
  }

  error(event) {
    console.error(event);
  }
}
