import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, from, tap, throwError } from 'rxjs';
import { Store } from '../../shared/classes/store.class';
import { UserCredentials } from '../models';
import { ErrorTransformPipe } from '../../shared/pipes/error-transform.pipe';
import { AuthService } from './auth.service';
import { UtilsService } from '../../shared/services/utils.service';

export interface AuthStore {
  isLoadingUser: boolean;
  isSignInLoading: boolean;
  isSignUpLoading: boolean;
  isGoogleAuthenticationLoading: boolean;
  isSignOutLoading: boolean;
  isProfileUpdateLoading: boolean;
}

const initialState: AuthStore = {
  isLoadingUser: true,
  isSignInLoading: false,
  isSignUpLoading: false,
  isGoogleAuthenticationLoading: false,
  isSignOutLoading: false,
  isProfileUpdateLoading: false,
};

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService extends Store<AuthStore> {
  userId?: string;
  isLoadingUser$ = this.select((state) => state.isLoadingUser);
  isSignInLoading$ = this.select((state) => state.isSignInLoading);
  isSignUpLoading$ = this.select((state) => state.isSignUpLoading);
  isGoogleAuthenticationLoading$ = this.select(
    (state) => state.isGoogleAuthenticationLoading
  );
  isSignOutLoading$ = this.select((state) => state.isSignOutLoading);
  isProfileUpdateLoading$ = this.select(
    (state) => state.isProfileUpdateLoading
  );

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService
  ) {
    super(initialState);
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = undefined;
      }
      this.setState({
        isLoadingUser: false,
      });
    });
  }

  handleSignIn({ email, password }: UserCredentials) {
    this.setState({
      isSignInLoading: true,
    });
    return from(this.authService.handleSignIn({ email, password })).pipe(
      tap(() => {
        this.setState({
          isSignInLoading: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isSignInLoading: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  handleSignUp({ email, password }: UserCredentials) {
    this.setState({
      isSignUpLoading: true,
    });
    return from(this.authService.handleSignUp({ email, password })).pipe(
      tap(() => {
        this.setState({
          isSignUpLoading: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isSignUpLoading: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  handleGoogleAuthentication() {
    this.setState({
      isGoogleAuthenticationLoading: true,
    });
    return from(this.authService.handleGoogleAuthentication()).pipe(
      tap(() => {
        this.setState({
          isGoogleAuthenticationLoading: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isGoogleAuthenticationLoading: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  handleSignOut() {
    this.setState({
      isSignOutLoading: true,
    });
    return from(this.authService.handleSignOut()).pipe(
      tap(() => {
        this.setState({
          isSignOutLoading: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isSignOutLoading: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }
}
