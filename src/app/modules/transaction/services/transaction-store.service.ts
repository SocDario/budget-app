import { Injectable } from '@angular/core';
import { catchError, from, tap } from 'rxjs';
import { Store } from '../../shared/classes/store.class';
import { UtilsService } from '../../shared/services/utils.service';
import {
  TransactionData,
  TransactionType,
  WalletToWalletTransactionData,
} from '../models';
import { TransactionActionsService } from './transaction-actions.service';

interface TransactionStore {
  transactions: TransactionData[];
  isLoadingTransactions: boolean;
  transactionsDataError: string;
  isLoadingCreateTransaction: boolean;
  createTransactionError: string;
  isLoadingDeleteTransaction: boolean;
  deleteTransactionError: string;
  isLoadingUpdateTransaction: boolean;
  updateTransactionError: string;
  walletToWalletTransactions: WalletToWalletTransactionData[];
  isLoadingWalletToWalletTransaction: boolean;
  walletToWalletTransactionError: string;
}

const initialValues: TransactionStore = {
  transactions: [],
  isLoadingTransactions: false,
  transactionsDataError: '',
  isLoadingCreateTransaction: false,
  createTransactionError: '',
  isLoadingDeleteTransaction: false,
  deleteTransactionError: '',
  isLoadingUpdateTransaction: false,
  updateTransactionError: '',
  walletToWalletTransactions: [],
  isLoadingWalletToWalletTransaction: false,
  walletToWalletTransactionError: '',
};

@Injectable({
  providedIn: 'root',
})
export class TransactionStoreService extends Store<TransactionStore> {
  transactions$ = this.select((state) => state.transactions);
  isLoadingTransactions$ = this.select((state) => state.isLoadingTransactions);
  transactionsDataError$ = this.select((state) => state.transactionsDataError);

  walletToWalletTransactions$ = this.select(
    (state) => state.walletToWalletTransactions
  );
  isLoadingWalletToWalletTransaction$ = this.select(
    (state) => state.isLoadingWalletToWalletTransaction
  );
  walletToWalletTransactionError$ = this.select(
    (state) => state.walletToWalletTransactionError
  );

  isLoadingCreateTransaction$ = this.select(
    (state) => state.isLoadingCreateTransaction
  );
  createTransactionError$ = this.select(
    (state) => state.createTransactionError
  );
  isLoadingDeleteTransaction$ = this.select(
    (state) => state.isLoadingDeleteTransaction
  );
  deleteTransactionError$ = this.select(
    (state) => state.deleteTransactionError
  );
  isLoadingUpdateTransaction$ = this.select(
    (state) => state.isLoadingUpdateTransaction
  );
  updateTransactionError$ = this.select(
    (state) => state.updateTransactionError
  );

  constructor(
    private readonly transactionsActionsService: TransactionActionsService,
    private readonly utilsService: UtilsService
  ) {
    super(initialValues);
  }

  getTransactions(transactionType: TransactionType) {
    this.setState({
      isLoadingTransactions: true,
    });
    return this.transactionsActionsService
      .getTransactions(transactionType)
      .pipe(
        tap((transactions) => {
          this.setState({
            isLoadingTransactions: false,
            transactions,
          });
        }),
        catchError((error) => {
          this.setState({
            isLoadingTransactions: false,
            transactionsDataError: error,
          });
          return this.utilsService.handleError(error);
        })
      );
  }

  createTransaction(
    transaction: TransactionData,
    transactionType: TransactionType
  ) {
    this.setState({
      isLoadingCreateTransaction: true,
    });
    return from(
      this.transactionsActionsService.createTransaction(
        transaction,
        transactionType
      )
    ).pipe(
      tap(() => {
        this.setState({
          isLoadingCreateTransaction: false,
        });
        this.utilsService.handleShowSnackbar(
          'Transaction successfully created'
        );
      }),
      catchError((error) => {
        this.setState({
          isLoadingCreateTransaction: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  updateTransaction(
    transactionId: string,
    transaction: TransactionData,
    transactionType: TransactionType
  ) {
    this.setState({
      isLoadingUpdateTransaction: true,
    });
    return from(
      this.transactionsActionsService.updateTransaction(
        transactionId,
        transaction,
        transactionType
      )
    ).pipe(
      tap(() => {
        this.setState({
          isLoadingUpdateTransaction: false,
        });
        this.utilsService.handleShowSnackbar(
          'Transaction successfully updated'
        );
      }),
      catchError((error) => {
        this.setState({
          isLoadingUpdateTransaction: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  deleteTransaction(transactionId: string, transactionType: TransactionType) {
    this.setState({
      isLoadingDeleteTransaction: true,
    });
    return from(
      this.transactionsActionsService.deleteTransaction(
        transactionId,
        transactionType
      )
    ).pipe(
      tap(() => {
        this.setState({
          isLoadingDeleteTransaction: false,
        });
        this.utilsService.handleShowSnackbar(
          'Transaction successfully deleted'
        );
      }),
      catchError((error) => {
        this.setState({
          isLoadingDeleteTransaction: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  getWalletToWalletTransactions() {
    this.setState({
      isLoadingWalletToWalletTransaction: true,
    });
    return this.transactionsActionsService.getWalletToWalletTransactions().pipe(
      tap((walletToWalletTransactions) => {
        this.setState({
          isLoadingWalletToWalletTransaction: false,
          walletToWalletTransactions,
        });
      }),
      catchError((error) => {
        this.setState({
          isLoadingWalletToWalletTransaction: false,
          walletToWalletTransactionError: error,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  createWalletToWalletTransaction(transaction: WalletToWalletTransactionData) {
    this.setState({
      isLoadingWalletToWalletTransaction: true,
    });
    return from(
      this.transactionsActionsService.createWalletToWalletTransaction({
        ...transaction,
        category: 'Internal',
        subcategory: 'wallet to wallet',
      })
    ).pipe(
      tap(() => {
        this.setState({
          isLoadingWalletToWalletTransaction: false,
        });
        this.utilsService.handleShowSnackbar(
          'Transaction successfully created'
        );
      }),
      catchError((error) => {
        this.setState({
          isLoadingWalletToWalletTransaction: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }
}
