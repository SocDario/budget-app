import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AuthStoreService } from '../../auth/services/auth-store.service';
import {
  TransactionData,
  TransactionType,
  WalletToWalletTransactionData,
} from '../models';

export enum TransactionCollections {
  Transaction = 'transactions',
  Expenses = 'expenses',
  Incomes = 'incomes',
  WalletToWallet = 'walletToWallet',
}

@Injectable({
  providedIn: 'root',
})
export class TransactionActionsService {
  private userId?: string;
  private transactionCollection = this.firestore.collection(
    TransactionCollections.Transaction
  );

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authStoreService: AuthStoreService
  ) {
    this.userId = this.authStoreService.userId;
  }

  determineTransactionType(transactionType: TransactionType) {
    const transactionCollection =
      transactionType === 'income'
        ? TransactionCollections.Incomes
        : TransactionCollections.Expenses;
    return this.transactionCollection
      .doc(this.userId)
      .collection<TransactionData>(transactionCollection);
  }

  getTransactions(transactionType: TransactionType) {
    return this.determineTransactionType(transactionType).valueChanges({
      idField: 'id',
    });
  }

  createTransaction(
    transaction: TransactionData,
    transactionType: TransactionType
  ) {
    return this.determineTransactionType(transactionType).add(transaction);
  }

  editTransaction(
    transactionId: string,
    transaction: TransactionData,
    transactionType: TransactionType
  ) {
    return this.determineTransactionType(transactionType)
      .doc(transactionId)
      .update(transaction);
  }

  deleteTransaction(transactionId: string, transactionType: TransactionType) {
    return this.determineTransactionType(transactionType)
      .doc(transactionId)
      .delete();
  }

  getWalletToWalletTransactions() {
    const walToWalCollection = TransactionCollections.WalletToWallet;
    return this.transactionCollection
      .doc(this.userId)
      .collection<WalletToWalletTransactionData>(walToWalCollection)
      .valueChanges({ idField: 'id' });
  }

  createWalletToWalletTransaction(transaction: WalletToWalletTransactionData) {
    const walToWalCollection = TransactionCollections.WalletToWallet;
    return this.transactionCollection
      .doc(this.userId)
      .collection<WalletToWalletTransactionData>(walToWalCollection)
      .add(transaction);
  }
}
