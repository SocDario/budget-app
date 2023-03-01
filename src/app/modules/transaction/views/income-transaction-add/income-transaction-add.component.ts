import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { AppRoutes } from 'src/app/modules/shared/enums';
import { WalletStoreService } from 'src/app/modules/wallet/services/wallet-store.service';
import { TransactionData, TransactionType } from '../../models';
import { CategoryStoreService } from '../../services/category-store.service';
import { TransactionStoreService } from '../../services/transaction-store.service';
import { filterWallets } from '../../utils';

@Component({
  selector: 'app-income-transaction-add',
  templateUrl: './income-transaction-add.component.html',
  styleUrls: ['./income-transaction-add.component.scss'],
})
export class IncomeTransactionAddComponent implements OnInit {
  transactionType: TransactionType = 'income';
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
    this.categoryStoreService.getCategories('income').subscribe();
    this.walletStoreService.getUserWallets().subscribe();
  }

  onFormSubmit(transaction: TransactionData) {
    const wallet = filterWallets(transaction.walletId, this.wallets$);
    if (!wallet) {
      return;
    }
    const updatedBalance = wallet.currentBalance + transaction.amount;
    const walletUpdate$ = this.walletStoreService.updateWallet(
      transaction.walletId,
      { ...wallet, currentBalance: updatedBalance }
    );
    const incomeTransactionCreate$ =
      this.transactionStoreService.createTransaction(
        transaction,
        this.transactionType
      );

    const mergedObs$ = merge(walletUpdate$, incomeTransactionCreate$);

    mergedObs$.subscribe(() => {
      this.router.navigate([AppRoutes.Home]);
    });
  }
}
