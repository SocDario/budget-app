import { Component, OnInit } from '@angular/core';
import { WalletStoreService } from 'src/app/modules/wallet/services/wallet-store.service';

@Component({
  selector: 'app-expense-transaction-add',
  templateUrl: './expense-transaction-add.component.html',
  styleUrls: ['./expense-transaction-add.component.scss'],
})
export class ExpenseTransactionAddComponent implements OnInit {
  wallets$ = this.walletStoreService.wallets$;

  constructor(private readonly walletStoreService: WalletStoreService) {}

  ngOnInit(): void {}
}
