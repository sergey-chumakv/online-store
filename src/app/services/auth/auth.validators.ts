import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class AuthValidators {
  public static equalPassword(control: FormGroup): ValidationErrors | null {
    const [password, copyPassword] = Object.values(control.value);

    return password === copyPassword ? null : { nonEqual: 'Password are not equal' };
  }

  public static loginValidate(control: FormControl): ValidationErrors | null {
    const isValid = /^[a-zA-Z]*$/.test(control.value);

    return isValid ? null : { onlyLetters: true };
  }
}
