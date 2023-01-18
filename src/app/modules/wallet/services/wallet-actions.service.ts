import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Wallet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WalletActionsService {
  walletsCollection = this.firestore.collection<Wallet>('wallets');

  constructor(private readonly firestore: AngularFirestore) {}

  getAllWallets(userId: string) {
    return this.firestore.collection<Wallet>('wallets', (ref) =>
      ref.where('userId', '==', userId)
    );
  }

  createWallet(wallet: Wallet) {
    return this.firestore.collection<Wallet>('wallets').add(wallet);
  }

  updateWallet(documentId: string, wallet: Wallet) {
    return this.firestore
      .collection<Wallet>('wallets')
      .doc(documentId)
      .update(wallet);
  }
}
