import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { Wallet } from '../../models';

@Component({
  selector: 'app-create-wallet-form',
  templateUrl: './create-wallet-form.component.html',
  styleUrls: ['./create-wallet-form.component.scss'],
})
export class CreateWalletFormComponent {
  @Input() isWalletLoading?: boolean;
  @Output() createWallet = new EventEmitter<Wallet>();

  walletForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    balance: [undefined, [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder) {}

  get name() {
    return this.walletForm.get('name');
  }

  get balance() {
    return this.walletForm.get('balance');
  }

  handleCreateWallet() {
    if (this.name?.value && this.balance?.value) {
      this.createWallet.emit({
        name: this.name.value,
        currentBalance: this.balance.value,
        createdTimestamp: Timestamp.now(),
      });
    }
  }
}
