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
}

const initialsValues: WalletStore = {
  wallets: [],
  isLoadingWallets: false,
  isLoadingCreateWallet: false,
  isLoadingWalletDelete: false,
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
    return this.walletActionService.getAllWallets(this.userId!).onSnapshot(
      (querySnapshot) => {
        let wallets: Wallet[] = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          wallets.push({
            id: doc.id,
            ...data,
          });
        });
        this.setState({
          wallets: wallets,
          isLoadingWallets: false,
        });
      },
      ({ message }) => {
        this.setState({
          isLoadingWallets: false,
        });
        this.utilsService.handleError(message);
      }
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
