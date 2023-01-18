import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/modules/shared/enums';
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

  constructor(
    private readonly authStoreService: AuthStoreService,
    private readonly router: Router
  ) {}

  onSignUpFormSubmit({ email, password }: UserCredentials) {
    this.authStoreService.handleSignUp({ email, password }).subscribe(() => {
      this.router.navigate([AppRoutes.Home]);
    });
  }

  onGoogleAuthentication() {
    this.authStoreService.handleGoogleAuthentication().subscribe(() => {
      this.router.navigate([AppRoutes.Home]);
    });
  }
}
