import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStoreService } from 'src/app/modules/auth/services/auth-store.service';
import { AppRoutes } from 'src/app/modules/shared/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private readonly authStoreService: AuthStoreService,
    private readonly router: Router
  ) {}

  onSignOut() {
    this.authStoreService
      .handleSignOut()
      .subscribe(() => this.router.navigate([AppRoutes.SignInPage]));
  }

  onNavigateWallet() {
    this.router.navigate([AppRoutes.Wallet]);
  }

  onNavigateTransactions() {
    this.router.navigate([AppRoutes.Transactions]);
  }
}
