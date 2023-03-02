import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthStoreService } from '../../auth/services/auth-store.service';
import { Wallet } from '../models';

export enum WalletsCollections {
  Wallets = 'wallets',
}
@Injectable({
  providedIn: 'root',
})
export class WalletActionsService {
  private userId?: string;
  private walletsCollection = this.firestore.collection(
    WalletsCollections.Wallets
  );

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authStoreService: AuthStoreService
  ) {
    this.userId = this.authStoreService.userId;
  }

  getUserWalletsCollection() {
    return this.walletsCollection
      .doc(this.userId)
      .collection<Wallet>(WalletsCollections.Wallets);
  }

  getAllWallets() {
    return this.getUserWalletsCollection().valueChanges({ idField: 'id' });
  }

  createWallet(wallet: Wallet) {
    return this.getUserWalletsCollection().add(wallet);
  }

  updateWallet(documentId: string, wallet: Wallet) {
    return this.getUserWalletsCollection().doc(documentId).update(wallet);
  }

  deleteWallet(documentId: string) {
    return this.getUserWalletsCollection().doc(documentId).delete();
  }
}
