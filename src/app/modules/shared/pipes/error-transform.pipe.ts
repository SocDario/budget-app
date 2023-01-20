import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import { FIREBASE_AUTH_ERRORS } from '../../auth/constants';

@Pipe({
  name: 'errorTransform',
})
export class ErrorTransformPipe implements PipeTransform {
  transform(error: unknown): string {
    if (this.isFirebaseError(error)) {
      return this.isRenamedFirebaseError(error.code);
    }
    return 'Something went wrong, please contact our support or try again.';
  }

  isFirebaseError(error: unknown): error is FirebaseError {
    return error instanceof FirebaseError === true;
  }

  isRenamedFirebaseError(errorCode: string) {
    for (const [key, value] of Object.entries(FIREBASE_AUTH_ERRORS)) {
      if (errorCode === key) {
        return value;
      }
    }
    return 'Something went wrong, please contact our support.';
  }
}
