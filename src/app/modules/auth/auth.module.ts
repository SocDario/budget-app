import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { ErrorTransformPipe } from '../shared/pipes/error-transform.pipe';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { DisableControlDirective } from '../shared/directives/disable-control.directive';

@NgModule({
  declarations: [
    SignInComponent,
    SignInFormComponent,
    GoogleButtonComponent,
    SignUpFormComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    DisableControlDirective,
  ],
  providers: [ErrorTransformPipe],
})
export class AuthModule {}
