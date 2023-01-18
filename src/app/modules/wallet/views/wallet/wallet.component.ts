import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from 'src/app/modules/auth/services/auth-store.service';
import { Wallet } from '../../models';
import { WalletStoreService } from '../../services/wallet-store.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  wallets$ = this.walletStoreService.wallets$;
  isLoadingWallets$ = this.walletStoreService.isLoadingWallets$;

  constructor(private readonly walletStoreService: WalletStoreService) {}

  ngOnInit() {
    this.walletStoreService.getUserWallets().subscribe((data) => {
      console.log(data);
    });
  }
}
