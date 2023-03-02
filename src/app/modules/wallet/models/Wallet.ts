import { Timestamp } from 'firebase/firestore';

export interface Wallet {
  id?: string;
  name: string;
  currentBalance: number;
  createdTimestamp: Timestamp;
  lastUsedTimestamp?: Timestamp;
}
