import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionHomeComponent } from './views/transaction-home/transaction-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { ExpenseTransactionAddComponent } from './views/expense-transaction-add/expense-transaction-add.component';
import { IncomeTransactionAddComponent } from './views/income-transaction-add/income-transaction-add.component';
import { WalletToWalletTransferComponent } from './views/wallet-to-wallet-transfer/wallet-to-wallet-transfer.component';
import { WalletToWalletTransactionFormComponent } from './components/wallet-to-wallet-transaction-form/wallet-to-wallet-transaction-form.component';

@NgModule({
  declarations: [
    TransactionHomeComponent,
    TransactionFormComponent,
    ExpenseTransactionAddComponent,
    IncomeTransactionAddComponent,
    WalletToWalletTransferComponent,
    WalletToWalletTransactionFormComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    SharedModule,
  ],
})
export class TransactionModule {}
