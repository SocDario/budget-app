import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AppRoutes } from 'src/app/modules/shared/enums';
import { UserCredentials } from '../../models';
import { AuthStoreService } from '../../services/auth-store.service';
import { UserProfileSetupStoreService } from '../../services/user-profile-setup-store.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  isSignUpLoading$ = this.authStoreService.isSignUpLoading$;
  isGoogleAuthenticationLoading$ =
    this.authStoreService.isGoogleAuthenticationLoading$;
  isUserProfilSetupLoading$ =
    this.userProfileSetupStoreService.isUserProfileSetupLoading$;

  constructor(
    private readonly authStoreService: AuthStoreService,
    private readonly userProfileSetupStoreService: UserProfileSetupStoreService,
    private readonly router: Router
  ) {}

  onSignUpFormSubmit({ email, password }: UserCredentials) {
    this.authStoreService
      .handleSignUp({ email, password })
      .pipe(
        switchMap(({ user }) => {
          return this.handleUserProfileSetup(user!.uid);
        })
      )
      .subscribe(() => {
        this.router.navigate([AppRoutes.Home]);
      });
  }

  onGoogleAuthentication() {
    this.authStoreService
      .handleGoogleAuthentication()
      .pipe(
        switchMap(({ user }) => {
          return this.handleUserProfileSetup(user!.uid);
        })
      )
      .subscribe(() => {
        this.router.navigate([AppRoutes.Home]);
      });
  }

  handleUserProfileSetup(userId: string) {
    return this.userProfileSetupStoreService.handleSetupUserProfileGroups(
      userId
    );
  }
}
