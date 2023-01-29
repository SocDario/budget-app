import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent {
  @Input() username?: string;
  @Output() signOut = new EventEmitter();
  @Output() navigateWallet = new EventEmitter();
  @Output() navigateTransactions = new EventEmitter();

  handleSignOut() {
    this.signOut.emit();
  }

  handleNavigateWallet() {
    this.navigateWallet.emit();
  }

  handleNavigateTransactions() {
    this.navigateTransactions.emit();
  }
}
