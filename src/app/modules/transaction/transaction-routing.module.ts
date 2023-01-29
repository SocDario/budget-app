import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../shared/enums';
import { ExpenseTransactionAddComponent } from './views/expense-transaction-add/expense-transaction-add.component';
import { TransactionHomeComponent } from './views/transaction-home/transaction-home.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionHomeComponent,
  },
  {
    path: AppRoutes.ExpenseTransaction,
    component: ExpenseTransactionAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
