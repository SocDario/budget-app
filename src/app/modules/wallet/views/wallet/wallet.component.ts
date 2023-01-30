import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/modules/shared/enums';
import { WalletStoreService } from '../../services/wallet-store.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  wallets$ = this.walletStoreService.wallets$;
  isLoadingWallets$ = this.walletStoreService.isLoadingWallets$;
  isLoadingDeleteWallet$ = this.walletStoreService.isLoadingWalletDelete$;

  constructor(
    private readonly walletStoreService: WalletStoreService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.walletStoreService.getUserWallets().subscribe();
  }

  handleWalletDelete(documentId: string) {
    this.walletStoreService.deleteWallet(documentId).subscribe();
  }

  navigateCreateWallet() {
    this.router.navigate([AppRoutes.CreateWallet], { relativeTo: this.route });
  }
}
