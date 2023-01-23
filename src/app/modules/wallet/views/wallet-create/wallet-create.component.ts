import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Wallet } from '../../models';
import { WalletStoreService } from '../../services/wallet-store.service';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.scss'],
})
export class WalletCreateComponent {
  isLoadingCreateWallet$ = this.walletStoreService.isLoadingCreateWallet$;

  constructor(
    private readonly walletStoreService: WalletStoreService,
    private readonly location: Location
  ) {}

  onCreateWallet(wallet: Wallet) {
    this.walletStoreService
      .createWallet({
        ...wallet,
      })
      .subscribe(() => {
        this.location.back();
      });
  }
}
