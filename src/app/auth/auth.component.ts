import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { AuthValidators } from './auth.validators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ISingUpForm, IUserAccount } from './auth.types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/material/snack-bar/snack-bar.component';
import { SchematicsAngularComponent } from '@angular/cli/lib/config/schema';
import { ComponentType } from '@angular/cdk/overlay';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public signUpForm = this.fb.group({
    username: ['SirDouchebag'.trim(), [Validators.required, AuthValidators.loginValidate]],
    email: ['', [Validators.required, Validators.email]],
    password: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        copyPassword: ['', [Validators.required]],
      },
      { validators: [AuthValidators.equalPassword] },
    ),
  });

  public submitted = false;

  get getColorSignInForm(): ThemePalette {
    return (this.signInForm.invalid && this.signInForm.touched) ||
      (this.signUpForm.invalid && this.signUpForm.touched)
      ? 'warn'
      : 'primary';
  }

  get isInvalidSignInFormEmail(): boolean {
    return (
      this.signInForm.controls.email.hasError('email') &&
      !this.signInForm.controls.email.hasError('required')
    );
  }

  get isInvalidSignUpFormEmail(): boolean {
    return (
      this.signUpForm.controls.email.hasError('email') &&
      !this.signUpForm.controls.email.hasError('required')
    );
  }

  get isNonEqualPassword(): boolean | undefined {
    return (
      this.signUpForm.get('password')?.hasError('nonEqual') &&
      this.signUpForm.get('password')?.get('copyPassword')?.touched
    );
  }

  get actualLengthPasswordSignIn(): number | null {
    return this.signInForm.get('password')?.errors?.minlength?.actualLength;
  }

  get actualLengthPasswordSignUp(): number | null {
    return this.signUpForm.get('password')?.get('password')?.errors?.minlength?.actualLength;
  }

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  public signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.submitted = true;

    this.auth.login(this.signInForm.value).subscribe(
      () => {
        this.signInForm.reset();
        this.router.navigate(['/home']);
        this.submitted = false;
      },
      () => (this.submitted = false),
    );
  }

  public signUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    this.submitted = true;

    const password: string = this.signUpForm.get('password')?.get('password')?.value;
    const singUp: ISingUpForm = { ...this.signUpForm.value, password };

    this.auth.signUp(singUp).subscribe(
      (resp) => {
        if ('idToken' in resp) {
          this.changeUserAccount(resp.idToken, this.signUpForm.get('username')?.value);
        }

        this.signUpForm.reset();
        this.router.navigate(['/auth']);
        this.submitted = false;

        this.showSnackBar(SnackBarComponent);
      },
      () => (this.submitted = false),
    );
  }

  public showSnackBar(component: ComponentType<unknown>): void {
    this.snackBar.openFromComponent(component, {
      duration: 1500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  public changeUserAccount(idToken: string, userName: string): void {
    const body: IUserAccount = {
      idToken,
      displayName: userName,
      returnSecureToken: false,
    };
    this.auth.changeAccount(body).subscribe(() => {});
  }

  public resetFormOnTabChange(tab: number): void {
    if (tab === 0 && !this.signUpForm.dirty) {
      this.signUpForm.reset();
    }
    if (tab === 1 && !this.signInForm.dirty) {
      this.signInForm.reset();
    }
  }
}
