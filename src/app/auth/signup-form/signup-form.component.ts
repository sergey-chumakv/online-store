import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthValidators } from '../auth.validators';
import { AuthService } from '../../services/auth/auth.service';
import { ISingUpForm } from '../auth.types';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  @Input() public submitted = false;
  @Output() public signup: EventEmitter<ISingUpForm> = new EventEmitter<ISingUpForm>();

  public signupForm: FormGroup = this.fb.group({
    username: ['SirDouchebag'.trim(), [Validators.required, AuthValidators.loginValidate]],
    email: ['', [Validators.required, Validators.email]],
    password: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        copyPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: [AuthValidators.equalPassword] },
    ),
  });

  get isUsernameEmpty(): boolean {
    return this.signupForm.controls.username.hasError('required');
  }

  get isEmailEmpty(): boolean {
    return this.signupForm.controls.email.hasError('required');
  }

  get isPasswordEmpty(): boolean {
    return !!this.signupForm.get('password')?.get('password')?.hasError('required');
  }

  get isCopyPasswordEmpty(): boolean {
    return !!this.signupForm.get('password')?.get('copyPassword')?.hasError('required');
  }

  get isEqualPassword(): boolean | undefined {
    return !(
      this.signupForm.get('password')?.hasError('nonEqual') &&
      this.signupForm.get('password')?.get('copyPassword')?.touched
    );
  }

  get currentPasswordLength(): number | null {
    return this.signupForm.get('password')?.get('password')?.errors?.minlength?.actualLength;
  }

  constructor(private fb: FormBuilder, public auth: AuthService) {}

  public submit(): void {
    if (this.signupForm.invalid) return;

    const password = this.signupForm.get('password')?.get('password')?.value;
    const formValue = { ...this.signupForm.value, password };

    this.signup.emit(formValue);
    this.signupForm.reset();
  }
}
