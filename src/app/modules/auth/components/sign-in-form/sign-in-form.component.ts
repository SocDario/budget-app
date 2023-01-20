import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserCredentials } from '../../models';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent {
  @Input() isSignInLoading = false;
  @Input() isGoogleAuthenticationLoading = false;
  @Output() googleAuthentication = new EventEmitter();
  @Output() formSubmited = new EventEmitter<UserCredentials>();
  passwordShown = false;

  signInForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder) {}

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
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
}
