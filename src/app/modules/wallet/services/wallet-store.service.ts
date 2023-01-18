import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, from, tap, throwError } from 'rxjs';
import { ErrorTransformPipe } from '../../auth/pipes/error-transform.pipe';
import { AuthStoreService } from '../../auth/services/auth-store.service';
import { Store } from '../../shared/classes/store.class';
import { Wallet } from '../models';
import { WalletActionsService } from './wallet-actions.service';

interface WalletStore {
  wallets: Wallet[];
  isLoadingWallets: boolean;
  walletsError: string;
  isLoadingCreateWallet: boolean;
}

const initialsValues: WalletStore = {
  wallets: [],
  isLoadingWallets: false,
  walletsError: '',
  isLoadingCreateWallet: false,
};

@Injectable({
  providedIn: 'root',
})
export class WalletStoreService extends Store<WalletStore> {
  userId?: string;
  wallets$ = this.select((state) => state.wallets);
  isLoadingWallets$ = this.select((state) => state.isLoadingWallets);
  walletsError$ = this.select((state) => state.walletsError);

  isLoadingCreateWallet$ = this.select((state) => state.isLoadingCreateWallet);

  constructor(
    private readonly walletActionService: WalletActionsService,
    private readonly authStoreService: AuthStoreService,
    private readonly errorTransform: ErrorTransformPipe,
    private readonly snackBar: MatSnackBar
  ) {
    super(initialsValues);
    this.authStoreService.userId$
      .pipe(
        tap((userId) => {
          this.userId = userId;
        })
      )
      .subscribe();
  }

  getUserWallets() {
    this.setState({
      isLoadingWallets: true,
    });
    return this.walletActionService
      .getAllWallets(this.userId!)
      .valueChanges({ idField: 'id' })
      .pipe(
        tap((wallets) => {
          this.setState({
            wallets,
            isLoadingWallets: false,
          });
        }),
        catchError((error) => {
          this.setState({
            isLoadingCreateWallet: false,
          });
          console.log('error');
          this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
            duration: 5000,
          });
          return throwError(
            () => new Error(this.errorTransform.transform(error))
          );
        })
      );
  }

  createWallet(wallet: Wallet) {
    this.setState({
      isLoadingCreateWallet: true,
    });
    return from(
      this.walletActionService.createWallet({ ...wallet, userId: this.userId! })
    ).pipe(
      tap(() => {
        this.setState({
          isLoadingCreateWallet: false,
        });
        this.snackBar.open('Wallet successfully created', 'Cancel', {
          duration: 4000,
        });
      }),
      catchError((error) => {
        this.setState({
          isLoadingCreateWallet: false,
        });
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
        return throwError(
          () => new Error(this.errorTransform.transform(error))
        );
      })
    );
  }
}
