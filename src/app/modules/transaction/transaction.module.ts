import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionHomeComponent } from './views/transaction-home/transaction-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { ExpenseTransactionFormComponent } from './components/expense-transaction-form/expense-transaction-form.component';
import { IncomeTransactionFormComponent } from './components/income-transaction-form/income-transaction-form.component';
import { ExpenseTransactionAddComponent } from './views/expense-transaction-add/expense-transaction-add.component';

@NgModule({
  declarations: [
    TransactionHomeComponent,
    ExpenseTransactionFormComponent,
    IncomeTransactionFormComponent,
    ExpenseTransactionAddComponent,
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
    SharedModule,
  ],
})
export class TransactionModule {}
