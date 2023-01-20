import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PriceTransformPipe } from './pipes/price-transform.pipe';
import { BackRoundButtonComponent } from './components/back-round-button/back-round-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ErrorTransformPipe } from './pipes/error-transform.pipe';

@NgModule({
  declarations: [
    PriceTransformPipe,
    BackRoundButtonComponent,
    ErrorTransformPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  exports: [BackRoundButtonComponent, PriceTransformPipe, ErrorTransformPipe],
})
export class SharedModule {}
