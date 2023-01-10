import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { UserCredentials } from '../../models';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  @Input() isSignUpLoading = false;
  @Input() isGoogleAuthenticationLoading = false;
  @Output() googleAuthentication = new EventEmitter();
  @Output() formSubmited = new EventEmitter<UserCredentials>();
  passwordShown = false;

  signUpForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, this.passwordValidation]],
      passwordConfirm: ['', [Validators.required]],
    },
    { validators: this.matchPasswordValidation }
  );

  constructor(private readonly fb: FormBuilder) {}

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get passwordConfirm() {
    return this.signUpForm.get('passwordConfirm');
  }

  handleGoogleAuthentication() {
    this.googleAuthentication.emit();
  }

  handleFormSubmited() {
    if (this.email?.value && this.password?.value) {
      this.formSubmited.emit({
        email: this.email.value,
        password: this.password.value,
      });
    }
  }

  passwordValidation(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    return password && pattern.test(password)
      ? null
      : {
          passwordError:
            'Password must be at least 8 characters long, must contain 1 number, uppecase and lowercase letter.',
        };
  }

  matchPasswordValidation(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (password?.value !== passwordConfirm?.value) {
      passwordConfirm?.setErrors({
        ...passwordConfirm.errors,
        passwordConfirmError: 'Passwords must match',
      });
    }

    return password?.value &&
      passwordConfirm?.value &&
      password.value === passwordConfirm.value
      ? null
      : { passwordConfirmError: 'Passwords must match' };
  }
}
