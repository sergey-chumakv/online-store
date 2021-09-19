import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  public canActivate(_: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): Observable<boolean> {
    return of(this.auth.isAuthenticated).pipe(
      switchMap((isLogged: boolean) => {
        if (!isLogged && url === '/auth') {
          return of(true);
        }
        if (isLogged && url === '/auth') {
          this.router.navigate(['/home']);

          return of(false);
        }
        if (!isLogged) {
          this.router.navigate(['/login']);
        }

        return of(isLogged);
      }),
    );
  }
}
