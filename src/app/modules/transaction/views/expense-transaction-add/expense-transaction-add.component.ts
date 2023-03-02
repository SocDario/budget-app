import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { AppRoutes } from 'src/app/modules/shared/enums';
import { WalletStoreService } from 'src/app/modules/wallet/services/wallet-store.service';
import { TransactionData, TransactionType } from '../../models';
import { CategoryStoreService } from '../../services/category-store.service';
import { TransactionStoreService } from '../../services/transaction-store.service';
import { filterWallets } from '../../utils';

@Component({
  selector: 'app-expense-transaction-add',
  templateUrl: './expense-transaction-add.component.html',
  styleUrls: ['./expense-transaction-add.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseTransactionAddComponent implements OnInit {
  transactionType: TransactionType = 'expense';
  wallets$ = this.walletStoreService.wallets$;
  isLoadingWallets$ = this.walletStoreService.isLoadingWallets$;
  isLoadingWalletUpdate$ = this.walletStoreService.isLoadingWalletUpdate$;
  categories$ = this.categoryStoreService.categories$;
  isLoadingCreateTransaction$ =
    this.transactionStoreService.isLoadingCreateTransaction$;

  constructor(
    private readonly walletStoreService: WalletStoreService,
    private readonly categoryStoreService: CategoryStoreService,
    private readonly transactionStoreService: TransactionStoreService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.categoryStoreService.getCategories('expense').subscribe();
    this.walletStoreService.getUserWallets().subscribe();
  }

  onFormSubmit(transaction: TransactionData) {
    const wallet = filterWallets(transaction.walletId, this.wallets$);

    if (!wallet) {
      return;
    }
    const updatedBalance = wallet.currentBalance - transaction.amount;
    const walletUpdate$ = this.walletStoreService.updateWallet(
      transaction.walletId,
      {
        ...wallet,
        currentBalance: updatedBalance,
        lastUsedTimestamp: transaction.date,
      }
    );
    const expenseTransactionCreate$ =
      this.transactionStoreService.createTransaction(
        transaction,
        this.transactionType
      );

    const mergedObs$ = merge(walletUpdate$, expenseTransactionCreate$);

    mergedObs$.subscribe(() => {
      this.router.navigate([AppRoutes.Home]);
    });
  }
}
