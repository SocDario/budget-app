import { Timestamp } from 'firebase/firestore';

export function convertDateToFirebaseTimestamp(dateString: string) {
  const date = new Date(dateString);
  const firebaseTimestamp = Timestamp.fromDate(date);
  return firebaseTimestamp;
}
