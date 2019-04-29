/* import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from './services/utils.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    private utils: UtilsService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const roles = next.data.roles;
    return this.auth.user$.pipe(
      map(user => {
        const isAllowed = this.auth.checkAuthorization(user, roles);

        if (!isAllowed) {
          this.utils.addSingleToast({
            severity: 'error',
            summary: 'Отказано в доступе',
            detail: 'Эта страница только для привилегированных пользователей'
          });
          this.router.navigate(['/']);
        }

        // console.log('isAllowed =', isAllowed);
        return isAllowed;
      })
    );
  }
}
 */
