import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './views/wallet/wallet.component';
import { WalletCardComponent } from './components/wallet-card/wallet-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorTransformPipe } from '../auth/pipes/error-transform.pipe';
import { PriceTransformPipe } from '../shared/pipes/price-transform.pipe';
import { CreateWalletFormComponent } from './components/create-wallet-form/create-wallet-form.component';
import { WalletCreateComponent } from './views/wallet-create/wallet-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WalletComponent,
    WalletCardComponent,
    CreateWalletFormComponent,
    WalletCreateComponent,
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [ErrorTransformPipe, PriceTransformPipe],
})
export class WalletModule {}
