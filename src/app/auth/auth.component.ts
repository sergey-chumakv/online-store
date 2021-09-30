import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { AuthValidators } from '../services/auth/auth.validators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ISingUpForm } from '../services/auth/auth.types';
import { HelpersService } from '../services/helpers.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public submitted = false;
  public tabSelected = 0;

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
    private helpersService: HelpersService,
  ) {}

  public login(): void {
    if (this.signInForm.invalid) return;

    this.submitted = true;
    this.auth.login(this.signInForm.value).subscribe(
      () => {
        this.auth.getUserData(this.auth.token).subscribe(
          (v) => {
            localStorage.setItem('user', JSON.stringify(v.users[0]));
            this.signInForm.reset();
            this.router.navigate(['/home']);
            this.submitted = false;
          },
          (error) => {
            this.helpersService.showSnackBar(`${error.name} Try again later `, 'Close', 'warn');
            this.auth.logout();
            this.submitted = false;
          },
        );
      },
      () => (this.submitted = false),
    );
  }

  public signUp(): void {
    if (this.signUpForm.invalid) return;

    this.submitted = true;
    const password: string = this.signUpForm.get('password')?.get('password')?.value;
    const singUp: ISingUpForm = { ...this.signUpForm.value, password };

    this.auth.signUp(singUp).subscribe(
      (resp) => {
        if ('idToken' in resp) {
          this.auth
            .updateUserProfile(resp.idToken, this.signUpForm.get('username')?.value)
            .subscribe((v) => {
              console.log(v);
            });
          this.auth.confirmationEmail(resp.idToken).subscribe();
        }

        this.signUpForm.reset();
        this.tabSelected = 0;
        this.submitted = false;

        this.helpersService.showSnackBar('Successful registration');
      },
      () => (this.submitted = false),
    );
  }

  public resetFormOnTabChange(tab: number): void {
    this.tabSelected = tab;
    if (tab === 0 && !this.signUpForm.dirty) this.signUpForm.reset();
    if (tab === 1 && !this.signInForm.dirty) this.signInForm.reset();
  }
}
