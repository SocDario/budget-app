import { Injectable } from '@angular/core';
import { catchError, from, tap } from 'rxjs';
import { AuthStoreService } from '../../auth/services/auth-store.service';
import { Store } from '../../shared/classes/store.class';
import { UtilsService } from '../../shared/services/utils.service';
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
    private readonly utilsService: UtilsService
  ) {
    super(initialsValues);
    this.userId = this.authStoreService.userId;
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
        this.utilsService.handleShowSnackbar('Wallet successfully created');
      }),
      catchError((error) => {
        this.setState({
          isLoadingCreateWallet: false,
        });
        return this.utilsService.handleError(error);
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
        this.utilsService.handleShowSnackbar('Wallet successfully deleted');
      }),
      catchError((error) => {
        this.setState({
          isLoadingWalletDelete: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }
}
