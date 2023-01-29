import { Injectable } from '@angular/core';
import { catchError, from, tap } from 'rxjs';
import { Store } from '../../shared/classes/store.class';
import { UtilsService } from '../../shared/services/utils.service';
import { ExpenseTransaction, IncomeTransaction } from '../models';
import { TransactionActionsService } from './transaction-actions.service';

interface TransactionStore {
  incomeTransactions: IncomeTransaction[];
  isLoadingIncomeTransactions: boolean;
  incomeTransactionsDataError: string;
  expenseTransactions: ExpenseTransaction[];
  isLoadingExpenseTransactions: boolean;
  expenseTransactionsDataError: string;
  isLoadingCreateTransaction: boolean;
  createTransactionError: string;
  isLoadingDeleteTransaction: boolean;
  deleteTransactionError: string;
  isLoadingUpdateTransaction: boolean;
  updateTransactionError: string;
}

const initialValues: TransactionStore = {
  incomeTransactions: [],
  isLoadingIncomeTransactions: false,
  incomeTransactionsDataError: '',
  expenseTransactions: [],
  isLoadingExpenseTransactions: false,
  expenseTransactionsDataError: '',
  isLoadingCreateTransaction: false,
  createTransactionError: '',
  isLoadingDeleteTransaction: false,
  deleteTransactionError: '',
  isLoadingUpdateTransaction: false,
  updateTransactionError: '',
};

@Injectable({
  providedIn: 'root',
})
export class TransactionStoreService extends Store<TransactionStore> {
  incomeTransactions$ = this.select((state) => state.incomeTransactions);
  isLoadingIncomeTransactions$ = this.select(
    (state) => state.isLoadingIncomeTransactions
  );
  incomeTransactionsDataError$ = this.select(
    (state) => state.incomeTransactionsDataError
  );

  expenseTransactions$ = this.select((state) => state.expenseTransactions);
  isLoadingExpenseTransactions$ = this.select(
    (state) => state.isLoadingExpenseTransactions
  );
  expenseTransactionsDataError$ = this.select(
    (state) => state.expenseTransactionsDataError
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

  getExpensesTransactions() {
    this.setState({
      isLoadingExpenseTransactions: true,
    });
    return this.transactionsActionsService.getExpenseTransactions().pipe(
      tap((expenseTransactions) => {
        this.setState({
          isLoadingExpenseTransactions: false,
          expenseTransactions,
        });
      }),
      catchError((error) => {
        this.setState({
          isLoadingExpenseTransactions: false,
          expenseTransactionsDataError: error,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  createExpenseTransaction(transaction: ExpenseTransaction) {
    this.setState({
      isLoadingCreateTransaction: true,
    });
    return from(
      this.transactionsActionsService.createExpenseTransaction(transaction)
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

  editExpenseTransaction(
    transactionId: string,
    transaction: ExpenseTransaction
  ) {
    this.setState({
      isLoadingUpdateTransaction: true,
    });
    return from(
      this.transactionsActionsService.editExpenseTransaction(
        transactionId,
        transaction
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

  deleteExpenseTransaction(transactionId: string) {
    this.setState({
      isLoadingDeleteTransaction: true,
    });
    return from(
      this.transactionsActionsService.deleteExpenseTransaction(transactionId)
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

  // -------------------- EXPENSE TRANSACTIONS END --------------------

  getIncomeTransactions() {
    this.setState({
      isLoadingIncomeTransactions: true,
    });
    return this.transactionsActionsService.getIncomeTransactions().pipe(
      tap((incomeTransactions) => {
        this.setState({
          isLoadingIncomeTransactions: false,
          incomeTransactions,
        });
      }),
      catchError((error) => {
        this.setState({
          isLoadingIncomeTransactions: false,
          incomeTransactionsDataError: error,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  createIncomeTransaction(transaction: IncomeTransaction) {
    this.setState({
      isLoadingCreateTransaction: true,
    });
    return from(
      this.transactionsActionsService.createIncomeTransaction(transaction)
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

  editIncomeTransaction(transactionId: string, transaction: IncomeTransaction) {
    this.setState({
      isLoadingUpdateTransaction: true,
    });
    return from(
      this.transactionsActionsService.editIncomeTransaction(
        transactionId,
        transaction
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

  deleteIncomeTransaction(transactionId: string) {
    this.setState({
      isLoadingDeleteTransaction: true,
    });
    return from(
      this.transactionsActionsService.deleteIncomeTransaction(transactionId)
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
}
