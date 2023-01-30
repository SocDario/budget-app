import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { map, merge, tap } from 'rxjs';
import { AppRoutes } from 'src/app/modules/shared/enums';
import { Wallet } from 'src/app/modules/wallet/models';
import { WalletStoreService } from 'src/app/modules/wallet/services/wallet-store.service';
import { ExpenseTransaction } from '../../models';
import { CategoryStoreService } from '../../services/category-store.service';
import { TransactionStoreService } from '../../services/transaction-store.service';

@Component({
  selector: 'app-expense-transaction-add',
  templateUrl: './expense-transaction-add.component.html',
  styleUrls: ['./expense-transaction-add.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseTransactionAddComponent implements OnInit {
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

  filterWallets(walletId: string) {
    let filteredWallet: Wallet | undefined;
    this.wallets$
      .pipe(
        map((wallets) => wallets.find((wallet) => wallet.id === walletId)),
        tap((wallet) => (filteredWallet = wallet))
      )
      .subscribe();
    return filteredWallet;
  }

  onFormSubmit(transaction: ExpenseTransaction) {
    const wallet = this.filterWallets(transaction.walletId);
    console.log(wallet);
    if (!wallet) {
      return;
    }
    const updatedBalance = wallet.currentBalance - transaction.amount;
    const walletUpdate$ = this.walletStoreService.updateWallet(
      transaction.walletId,
      { ...wallet, currentBalance: updatedBalance }
    );
    const expenseTransactionCreate$ =
      this.transactionStoreService.createExpenseTransaction(transaction);

    const mergedObs$ = merge(walletUpdate$, expenseTransactionCreate$);

    mergedObs$.subscribe(() => {
      this.router.navigate([AppRoutes.Home]);
    });
  }
}
