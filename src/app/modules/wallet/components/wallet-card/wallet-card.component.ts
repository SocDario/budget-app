import { Component, Input } from '@angular/core';
import { Wallet } from '../../models';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss'],
})
export class WalletCardComponent {
  @Input() wallet?: Wallet;
  balanceShown? = true;
}
