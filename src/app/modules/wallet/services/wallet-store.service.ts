import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, from, tap, throwError } from 'rxjs';
import { ErrorTransformPipe } from '../../shared/pipes/error-transform.pipe';
import { AuthStoreService } from '../../auth/services/auth-store.service';
import { Store } from '../../shared/classes/store.class';
import { Wallet } from '../models';
import { WalletActionsService } from './wallet-actions.service';

interface WalletStore {
  wallets: Wallet[];
  isLoadingWallets: boolean;
  isLoadingCreateWallet: boolean;
  isLoadingWalletDelete: boolean;
  isLoadingWalletUpdate: boolean;
  walletUpdateError: string;
}

const initialsValues: WalletStore = {
  wallets: [],
  isLoadingWallets: false,
  isLoadingCreateWallet: false,
  isLoadingWalletDelete: false,
  isLoadingWalletUpdate: false,
  walletUpdateError: '',
};

@Injectable({
  providedIn: 'root',
})
export class WalletStoreService extends Store<WalletStore> {
  userId?: string;
  wallets$ = this.select((state) => state.wallets);
  isLoadingWallets$ = this.select((state) => state.isLoadingWallets);

  isLoadingCreateWallet$ = this.select((state) => state.isLoadingCreateWallet);
  isLoadingWalletDelete$ = this.select((state) => state.isLoadingWalletDelete);

  isLoadingWalletUpdate$ = this.select((state) => state.isLoadingWalletUpdate);
  walletUpdateError$ = this.select((state) => state.walletUpdateError);

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

  handleError(error: string) {
    this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
      duration: 5000,
    });
    return throwError(() => new Error(this.errorTransform.transform(error)));
  }

  getUserWallets() {
    this.setState({
      isLoadingWallets: true,
    });
    return this.walletActionService.getAllWallets(this.userId!).pipe(
      tap((wallets) => {
        this.setState({
          wallets: wallets,
          isLoadingWallets: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isLoadingWallets: false,
        });
        return this.utilsService.handleError(error);
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
        return this.handleError(error);
      })
    );
  }

  updateWallet(documentId: string, wallet: Wallet, showSnackbar?: boolean) {
    this.setState({
      isLoadingWalletUpdate: true,
    });
    return from(this.walletActionService.updateWallet(documentId, wallet)).pipe(
      tap(() => {
        this.setState({
          isLoadingWalletUpdate: false,
        });
        showSnackbar &&
          this.utilsService.handleShowSnackbar('Wallet successfully updated');
      }),
      catchError((error) => {
        this.setState({
          isLoadingWalletUpdate: false,
          walletUpdateError: 'An error occured while updating wallet',
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  deleteWallet(documentId: string) {
    this.setState({
      isLoadingWalletDelete: true,
    });
    return from(this.walletActionService.deleteWallet(documentId)).pipe(
      tap(() => {
        this.setState({
          isLoadingWalletDelete: false,
        });
        this.snackBar.open('Wallet successfully deleted', 'Cancel', {
          duration: 4000,
        });
      }),
      catchError((error) => {
        this.setState({
          isLoadingWalletDelete: false,
        });
        return this.handleError(error);
      })
    );
  }
}
