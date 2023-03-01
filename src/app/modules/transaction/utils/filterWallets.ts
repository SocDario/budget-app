import { map, Observable, tap } from 'rxjs';
import { Wallet } from '../../wallet/models';

export function filterWallets(
  walletId: string,
  wallets$: Observable<Wallet[]>
) {
  let filteredWallet: Wallet | undefined;
  wallets$
    .pipe(
      map((wallets) => wallets.find((wallet) => wallet.id === walletId)),
      tap((wallet) => (filteredWallet = wallet))
    )
    .subscribe();
  return filteredWallet;
}
