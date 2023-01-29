import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Wallet } from 'src/app/modules/wallet/models';

@Component({
  selector: 'app-expense-transaction-form',
  templateUrl: './expense-transaction-form.component.html',
  styleUrls: ['./expense-transaction-form.component.scss'],
})
export class ExpenseTransactionFormComponent implements OnInit {
  @Input() wallets?: Wallet[];
  selectedWalletBalance?: number;

  transactionForm = this.fb.group({
    walletId: ['', [Validators.required]],
    category: ['', [Validators.required]],
    subcategory: ['', [Validators.required]],
    amount: [0, [Validators.required]],
    description: [''],
    location: [''],
    transactionTo: [''],
    date: [''],
  });

  constructor(private readonly fb: FormBuilder) {}

  get walletId() {
    return this.transactionForm.get('walletId');
  }

  get category() {
    return this.transactionForm.get('category');
  }

  get subcategory() {
    return this.transactionForm.get('subcategory');
  }

  get amount() {
    return this.transactionForm.get('amount');
  }

  get description() {
    return this.transactionForm.get('description');
  }

  get location() {
    return this.transactionForm.get('location');
  }

  get transactionTo() {
    return this.transactionForm.get('transactionTo');
  }

  get date() {
    return this.transactionForm.get('date');
  }

  ngOnInit(): void {}

  handleSetWalletBalance(wallet: Wallet) {
    console.log(wallet);
    this.selectedWalletBalance = wallet.currentBalance;
  }
}
