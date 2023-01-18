import { Timestamp } from 'firebase/firestore';

export interface Wallet {
  id?: string;
  userId: string;
  name: string;
  currentBalance: number;
  createdTimestamp: Timestamp;
  lastUsedTimestamp?: Timestamp;
}
