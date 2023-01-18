import { Component, Input, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { AuthStoreService } from 'src/app/modules/auth/services/auth-store.service';
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
    private readonly authStoreService: AuthStoreService
  ) {}

  onCreateWallet(wallet: Wallet) {
    // this.userId$
    //   .pipe(
    //     switchMap((userId) => {
    //       return this.walletStoreService.createWallet({
    //         ...wallet,
    //         userId: userId,
    //       });
    //     })
    //   )
    //   .subscribe();

    this.walletStoreService
      .createWallet({
        ...wallet,
      })
      .subscribe();
  }
}
