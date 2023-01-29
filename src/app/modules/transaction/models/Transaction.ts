import { Timestamp } from 'firebase/firestore';

export interface IncomeTransaction {
  id?: string;
  walletId: string;
  category: string;
  subcategory: string;
  amount: number;
  description?: string;
  transactionFrom?: string;
  date: Timestamp;
}

export interface ExpenseTransaction {
  id?: string;
  walletId: string;
  category: string;
  subcategory: string;
  amount: number;
  description?: string;
  location?: string;
  transactionTo?: string;
  date: Timestamp;
}
