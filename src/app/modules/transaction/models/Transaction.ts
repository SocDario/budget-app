import { Timestamp } from 'firebase/firestore';

export type TransactionType = 'income' | 'expense';
export interface TransactionData {
  id?: string;
  walletId: string;
  category: string;
  subcategory: string;
  amount: number;
  date: Timestamp;
  recurringTransaction: boolean;
  location: string | null;
  description: string | null;
  transactionOrigin: string | null;
}

export interface WalletToWalletTransactionData {
  id?: string;
  fromWalletId: string;
  toWalletId: string;
  amount: number;
  category?: string;
  subcategory?: string;
  description: string | null;
  date: Timestamp;
}
