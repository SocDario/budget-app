import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { ErrorTransformPipe } from '../pipes/error-transform.pipe';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly errorTransform: ErrorTransformPipe
  ) {}

  handleShowSnackbar(message: string) {
    return this.snackBar.open(message, 'Cancel', {
      duration: 4000,
    });
  }

  handleShowErrorSnackbar(error: string) {
    return this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
      duration: 4000,
    });
  }

  handleError(error: string) {
    this.handleShowErrorSnackbar(error);
    return throwError(() => new Error(this.errorTransform.transform(error)));
  }
}
