import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/modules/shared/enums';

@Component({
  selector: 'app-transaction-home',
  templateUrl: './transaction-home.component.html',
  styleUrls: ['./transaction-home.component.scss'],
})
export class TransactionHomeComponent {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  handleNavigateCreateIncome() {
    this.router.navigate([AppRoutes.IncomeTransaction], {
      relativeTo: this.route,
    });
  }

  handleNavigateCreateExpense() {
    this.router.navigate([AppRoutes.ExpenseTransaction], {
      relativeTo: this.route,
    });
  }

  handleNavigateWalletTransfer() {
    this.router.navigate([AppRoutes.WalletToWalletTransfer], {
      relativeTo: this.route
    })
  }
}
