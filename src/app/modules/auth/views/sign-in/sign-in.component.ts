import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/modules/shared/enums';
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

  constructor(
    private readonly authStoreService: AuthStoreService,
    private readonly router: Router
  ) {}

  onSignInFormSubmited({ email, password }: UserCredentials) {
    this.authStoreService.handleSignIn({ email, password }).subscribe(() => {
      this.router.navigate([AppRoutes.Home]);
    });
  }

  onGoogleAuthentication() {
    this.authStoreService.handleGoogleAuthentication().subscribe(() => {
      this.router.navigate([AppRoutes.Home]);
    });
  }
}
