import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Wallet } from '../../models';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss'],
})
export class WalletCardComponent {
  @Input() wallet?: Wallet;
  @Output() walletDelete = new EventEmitter<string>();
  balanceShown? = true;

  onWalletDelete(documentId: string) {
    this.walletDelete.emit(documentId);
  }
}
