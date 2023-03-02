import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { AppRoutes } from 'src/app/modules/shared/enums';
import { Wallet } from 'src/app/modules/wallet/models';
import { WalletStoreService } from 'src/app/modules/wallet/services/wallet-store.service';
import { WalletToWalletTransactionData } from '../../models';
import { TransactionStoreService } from '../../services/transaction-store.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-wallet-to-wallet-transfer',
  templateUrl: './wallet-to-wallet-transfer.component.html',
  styleUrls: ['./wallet-to-wallet-transfer.component.scss'],
})
export class WalletToWalletTransferComponent {
  wallets$ = this.walletStoreService.wallets$;
  isLoadingWallets$ = this.walletStoreService.isLoadingWallets$;
  isLoadingWalletUpdate$ = this.walletStoreService.isLoadingWalletUpdate$;
  isLoadingWalletToWalletTransaction$ =
    this.transactionStoreService.isLoadingWalletToWalletTransaction$;

  wallets: Wallet[] = [];

  constructor(
    private readonly walletStoreService: WalletStoreService,
    private readonly transactionStoreService: TransactionStoreService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.walletStoreService.getUserWallets().subscribe((wallets) => {
      this.wallets = wallets;
    });
  }

  handleWalletToWalletTransfer(transaction: WalletToWalletTransactionData) {
    const transactionCreate$ =
      this.transactionStoreService.createWalletToWalletTransaction(transaction);

    const mergedObs$ = merge(
      transactionCreate$,
      this.handleUpdateWallets(
        transaction.amount,
        transaction.fromWalletId,
        transaction.toWalletId,
        transaction.date
      )
    );

    mergedObs$.subscribe(() => {
      this.router.navigate([AppRoutes.Home]);
    });
  }

  handleUpdateWallets(
    transactionAmount: number,
    fromWalletId: string,
    toWalletId: string,
    transactionDate: Timestamp
  ) {
    const fromWallet = this.wallets.find(
      (wallet) => wallet.id === fromWalletId
    );
    const toWallet = this.wallets.find((wallet) => wallet.id === toWalletId);

    const fromWalletUpdatedBalance =
      fromWallet?.currentBalance! - transactionAmount;
    const toWalletUpdatedBalance =
      toWallet?.currentBalance! + transactionAmount;

    const fromWalletUpdate$ = this.walletStoreService.updateWallet(
      fromWallet?.id!,
      {
        ...fromWallet!,
        currentBalance: fromWalletUpdatedBalance,
        lastUsedTimestamp: transactionDate,
      }
    );
    const toWalletUpdate$ = this.walletStoreService.updateWallet(
      toWallet?.id!,
      {
        ...toWallet!,
        currentBalance: toWalletUpdatedBalance,
        lastUsedTimestamp: transactionDate,
      }
    );

    return merge(fromWalletUpdate$, toWalletUpdate$);
  }
}
