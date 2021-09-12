import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { AuthValidators } from './auth.validators';

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
    username: ['SirSchmuck'.trim(), [Validators.required, AuthValidators.loginValidate]],
    email: ['', [Validators.required, Validators.email]],
    password: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        copyPassword: ['', [Validators.required]],
      },
      { validators: [AuthValidators.equalPassword] },
    ),
  });
  public selected = 0;

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

  constructor(private fb: FormBuilder) {}

  public signIn(): void {
    console.log(this.signInForm.value);
  }

  public signUp(): void {
    console.log(this.signUpForm.value);
  }

  public selectTabs($event: number): void {
    this.selected = $event;
    if (this.selected === 0 && !this.signUpForm.dirty) {
      this.signUpForm.reset();
    }
    if (this.selected === 1 && !this.signInForm.dirty) {
      this.signInForm.reset();
    }
  }
}
