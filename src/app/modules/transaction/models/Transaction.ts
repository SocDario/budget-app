import { Timestamp } from 'firebase/firestore';

export interface IncomeTransaction {
  id?: string;
  walletId: string;
  category: string;
  subcategory: string;
  amount: number;
  date: Timestamp;
  recurringTransaction: boolean;
  location: string | null;
  description: string | null;
  transactionFrom: string | null;
}

export interface ExpenseTransaction {
  id?: string;
  walletId: string;
  category: string;
  subcategory: string;
  amount: number;
  date: Timestamp;
  recurringTransaction: boolean;
  description: string | null;
  location: string | null;
  transactionTo: string | null;
}
