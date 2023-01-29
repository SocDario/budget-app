import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap, throwError } from 'rxjs';
import { Store } from '../../shared/classes/store.class';
import { ErrorTransformPipe } from '../../shared/pipes/error-transform.pipe';
import { UtilsService } from '../../shared/services/utils.service';
import { UserProfileSetupService } from './user-profile-setup.service';

interface UserProfileSetupStore {
  isUserProfileSetupLoading: boolean;
  userProfileSetupError: string;
}

const initialValues: UserProfileSetupStore = {
  isUserProfileSetupLoading: false,
  userProfileSetupError: '',
};

@Injectable({
  providedIn: 'root',
})
export class UserProfileSetupStoreService extends Store<UserProfileSetupStore> {
  isUserProfileSetupLoading$ = this.select(
    (state) => state.isUserProfileSetupLoading
  );
  userProfileSetupError$ = this.select((state) => state.userProfileSetupError);

  constructor(
    private readonly userProfileSetupService: UserProfileSetupService,
    private readonly utilsService: UtilsService
  ) {
    super(initialValues);
  }

  handleSetupUserProfileGroups(userId: string) {
    this.setState({
      isUserProfileSetupLoading: true,
    });
    return this.userProfileSetupService.createUserProfileGroups(userId).pipe(
      tap(() => {
        this.setState({
          isUserProfileSetupLoading: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isUserProfileSetupLoading: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }
}
