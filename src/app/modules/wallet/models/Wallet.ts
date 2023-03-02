import { Timestamp } from 'firebase/firestore';

export interface Wallet {
  id?: string;
  name: string;
  currentBalance: number;
  walletType: string;
  createdTimestamp: Timestamp;
  lastUsedTimestamp?: Timestamp;
  linkedSavingWalletId?: string;
}
