import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    public user: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.user.user$.pipe(
      map(user => {
        if (!user.admin) {
          this.snackBar.open('Эта страница только для администраторов', '', {
            duration: 5000
          });
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
