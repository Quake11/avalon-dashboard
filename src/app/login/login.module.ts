import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFirestoreModule,
    MatPasswordStrengthModule,
    MatButtonModule,
    NgxAuthFirebaseUIModule
  ]
})
export class LoginModule {}
