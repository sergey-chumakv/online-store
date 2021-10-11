import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ILoginForm, ISingUpForm } from './auth.types';
import { HelpersService } from '../utils/helpers.service';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from '../utils/unsubscriber';
import { UsersApiService } from '../services/users-api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends UnSubscriber {
  public submitted = false;
  public tabSelected!: number;

  constructor(
    public auth: AuthService,
    private router: Router,
    private helpersService: HelpersService,
    private usersApi: UsersApiService,
  ) {
    super();
  }

  public login(form: ILoginForm): void {
    this.submitted = true;
    this.auth
      .login(form)
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe(
        () => this.router.navigate(['/home']),
        (error) => {
          this.helpersService.showSnackBar(`${error.name} Try again later `, 'Close', 'warn');
          this.auth.logout();
          this.submitted = false;
        },
      );
  }

  public signup(form: ISingUpForm): void {
    this.submitted = true;
    this.auth
      .signUp(form)
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe(
        (resp) => {
          if ('idToken' in resp) {
            this.usersApi.changeUserData(resp.idToken, form.login).subscribe();
            this.auth.confirmUserEmail(resp.idToken).subscribe();
          }

          this.tabSelected = 0;
          this.submitted = false;
          this.helpersService.showSnackBar('Successful registration', null, 'warn');
        },
        () => (this.submitted = false),
      );
  }
}
