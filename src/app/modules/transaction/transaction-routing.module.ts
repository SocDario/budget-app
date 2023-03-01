import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../shared/enums';
import { ExpenseTransactionAddComponent } from './views/expense-transaction-add/expense-transaction-add.component';
import { IncomeTransactionAddComponent } from './views/income-transaction-add/income-transaction-add.component';
import { TransactionHomeComponent } from './views/transaction-home/transaction-home.component';
import { WalletToWalletTransferComponent } from './views/wallet-to-wallet-transfer/wallet-to-wallet-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionHomeComponent,
  },
  {
    path: AppRoutes.ExpenseTransaction,
    component: ExpenseTransactionAddComponent,
  },
  {
    path: AppRoutes.IncomeTransaction,
    component: IncomeTransactionAddComponent,
  },
  {
    path: AppRoutes.WalletToWalletTransfer,
    component: WalletToWalletTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
