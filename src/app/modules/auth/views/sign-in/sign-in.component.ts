import { Component } from '@angular/core';
import { UserCredentials } from '../../models';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  isSignInLoading$ = this.authStoreService.isSignInLoading$;
  isGoogleAuthenticationLoading$ =
    this.authStoreService.isGoogleAuthenticationLoading$;

  constructor(private readonly authStoreService: AuthStoreService) {}

  onSignInFormSubmited({ email, password }: UserCredentials) {
    this.authStoreService.handleSignIn({ email, password }).subscribe();
  }

  onGoogleAuthentication() {
    this.authStoreService.handleGoogleAuthentication().subscribe();
  }
}
