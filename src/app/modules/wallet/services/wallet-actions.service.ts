import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Wallet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WalletActionsService {
  private walletsCollection: AngularFirestoreCollection<Wallet>;

  constructor(private readonly firestore: AngularFirestore) {
    this.walletsCollection = this.firestore.collection<Wallet>('wallets');
  }

  getAllWallets(userId: string) {
    return this.firestore
      .collection<Wallet>('wallets', (ref) => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' });
  }

  createWallet(wallet: Wallet) {
    return this.walletsCollection.add(wallet);
  }

  updateWallet(documentId: string, wallet: Wallet) {
    return this.walletsCollection.doc(documentId).update(wallet);
  }

  deleteWallet(documentId: string) {
    return this.walletsCollection.doc(documentId).delete();
  }
}
