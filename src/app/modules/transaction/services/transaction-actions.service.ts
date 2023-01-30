import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthStoreService } from '../../auth/services/auth-store.service';
import { ExpenseTransaction, IncomeTransaction } from '../models';

export enum TransactionCollections {
  Transaction = 'transactions',
  Expenses = 'expenses',
  Incomes = 'incomes',
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

  getExpenseCollection() {
    return this.transactionCollection
      .doc(this.userId)
      .collection<ExpenseTransaction>(TransactionCollections.Expenses);
  }

  getIncomesCollection() {
    return this.transactionCollection
      .doc(this.userId)
      .collection<IncomeTransaction>(TransactionCollections.Incomes);
  }

  getExpenseTransactions() {
    return this.getExpenseCollection().valueChanges({ idField: 'id' });
  }

  createExpenseTransaction(transaction: ExpenseTransaction) {
    return this.getExpenseCollection().add(transaction);
  }

  editExpenseTransaction(
    transactionId: string,
    transaction: ExpenseTransaction
  ) {
    return this.getExpenseCollection().doc(transactionId).update(transaction);
  }

  deleteExpenseTransaction(transactionId: string) {
    return this.getExpenseCollection().doc(transactionId).delete();
  }

  getIncomeTransactions() {
    return this.getIncomesCollection().valueChanges({ idField: 'id' });
  }

  createIncomeTransaction(transaction: IncomeTransaction) {
    return this.getIncomesCollection().add(transaction);
  }

  editIncomeTransaction(transactionId: string, transaction: IncomeTransaction) {
    return this.getIncomesCollection().doc(transactionId).update(transaction);
  }

  deleteIncomeTransaction(transactionId: string) {
    return this.getIncomesCollection().doc(transactionId).delete();
  }
}
