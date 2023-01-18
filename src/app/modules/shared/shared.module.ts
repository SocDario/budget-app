import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DisableControlDirective } from './directives/disable-control.directive';
import { PriceTransformPipe } from './pipes/price-transform.pipe';
import { BackRoundButtonComponent } from './components/back-round-button/back-round-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DisableControlDirective,
    PriceTransformPipe,
    BackRoundButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  exports: [DisableControlDirective, BackRoundButtonComponent],
})
export class SharedModule {}
