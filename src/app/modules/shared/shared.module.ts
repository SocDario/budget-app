import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DisableControlDirective } from './directives/disable-control.directive';

@NgModule({
  declarations: [DisableControlDirective],
  imports: [CommonModule, MatSnackBarModule],
  exports: [DisableControlDirective],
})
export class SharedModule {}
