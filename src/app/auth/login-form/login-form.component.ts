import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ILoginForm } from '../auth.types';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() public submitted = false;
  @Output() public login: EventEmitter<ILoginForm> = new EventEmitter<ILoginForm>();

  public hide = true;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get isEmailEmpty(): boolean {
    return this.loginForm.controls.email.hasError('required');
  }

  get isPasswordEmpty(): boolean {
    return this.loginForm.controls.password.hasError('required');
  }

  get actualLengthPassword(): number | null {
    return this.loginForm.get('password')?.errors?.minlength?.actualLength;
  }

  constructor(private fb: FormBuilder, public auth: AuthService) {}

  public submit(): void {
    if (this.loginForm.invalid) return;
    this.login.emit(this.loginForm.value);
    this.loginForm.reset();
  }
}
