import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Wallet } from 'src/app/modules/wallet/models';
import * as moment from 'moment';
import { convertDateToFirebaseTimestamp, dateValidator, nonNegativeNumberValidator } from '../../utils';
import { WalletToWalletTransactionData } from '../../models';

interface WalToWalForm {
  fromWallet: FormControl<Wallet | null>;
  toWallet: FormControl<Wallet | null>;
  amount: FormControl<number | null>;
  date: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-wallet-to-wallet-transaction-form',
  templateUrl: './wallet-to-wallet-transaction-form.component.html',
  styleUrls: ['./wallet-to-wallet-transaction-form.component.scss'],
})
export class WalletToWalletTransactionFormComponent implements OnInit, OnDestroy {
  @Input() wallets: Wallet[] = [];
  @Input() isSaveTransactionLoading?: boolean;
  @Output() formSubmitted = new EventEmitter<WalletToWalletTransactionData>();

  walToWalForm = new FormGroup<WalToWalForm>({
    fromWallet: new FormControl(null, { validators: [Validators.required] }),
    toWallet: new FormControl(null, { validators: [Validators.required] }),
    amount: new FormControl(null, {
      validators: [Validators.required, nonNegativeNumberValidator],
    }),
    date: new FormControl('', {
      validators: [Validators.required, dateValidator],
    }),
    description: new FormControl(''),
  });

  subscription?: Subscription;
  remainingWallets: Wallet[] = [];

  constructor() {
    let now = moment();
    this.walToWalForm.patchValue({
      date: now.format('YYYY-MM-DDTHH:mm'),
    });
  }

  get fromWallet() {
    return this.walToWalForm.get('fromWallet');
  }

  get toWallet() {
    return this.walToWalForm.get('toWallet');
  }

  get amount() {
    return this.walToWalForm.get('amount');
  }

  get date() {
    return this.walToWalForm.get('date');
  }

  get description() {
    return this.walToWalForm.get('description');
  }

  ngOnInit() {
    this.subscription = this.fromWallet?.valueChanges.subscribe((wallet) => {
      if (wallet) {
        if (this.wallets) {
          const walletIndex = this.wallets.findIndex(
            (wal) => wal.id === wallet?.id
          );
          if (walletIndex !== -1) {
            this.remainingWallets = [
              ...this.wallets.slice(0, walletIndex),
              ...this.wallets.slice(walletIndex + 1),
            ];
          }
        }
        this.fromWallet?.disable({ onlySelf: true, emitEvent: false });
      } else {
        this.fromWallet?.enable({ onlySelf: true, emitEvent: false });
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  handleClearFromWalletField() {
    this.fromWallet?.patchValue(null);
  }

  handleFormSubmit() {
    if (
      !this.fromWallet?.value?.id ||
      !this.toWallet?.value?.id ||
      !this.amount?.value ||
      !this.date?.value
    ) {
      return;
    }

    const transaction: WalletToWalletTransactionData = {
      fromWalletId: this.fromWallet.value.id,
      toWalletId: this.toWallet.value.id,
      amount: this.amount.value,
      description: this.description?.value || null,
      date: convertDateToFirebaseTimestamp(this.date.value),
    };

    this.formSubmitted.emit(transaction);
  }
}
