import { Component } from '@angular/core';
import { UserCredentials } from '../../models';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  isSignUpLoading$ = this.authStoreService.isSignUpLoading$;
  isGoogleAuthenticationLoading$ =
    this.authStoreService.isGoogleAuthenticationLoading$;

  constructor(private readonly authStoreService: AuthStoreService) {}

  onSignUpFormSubmit({ email, password }: UserCredentials) {
    this.authStoreService.handleSignUp({ email, password }).subscribe();
  }

  onGoogleAuthentication() {
    this.authStoreService.handleGoogleAuthentication().subscribe();
  }
}
