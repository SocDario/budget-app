import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import * as moment from 'moment';
import { Wallet } from 'src/app/modules/wallet/models';
import { Category, TransactionData, TransactionType } from '../../models';
import { dateValidator, convertDateToFirebaseTimestamp, nonNegativeNumberValidator } from '../../utils';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent {
  @Input() wallets?: Wallet[];
  @Input() categories?: Category[];
  @Input() transactionType?: TransactionType;
  @Output() formSubmited = new EventEmitter<TransactionData>();

  transactionForm = this.fb.group({
    amount: [undefined, [Validators.required, nonNegativeNumberValidator]],
    walletId: ['', [Validators.required]],
    category: ['', [Validators.required]],
    subcategory: ['', [Validators.required]],
    date: ['', [dateValidator, Validators.required]],
    transactionOrigin: '',
    location: '',
    description: '',
    isRecurringTransaction: false,
  });

  constructor(private readonly fb: FormBuilder) {
    let now = moment();
    this.transactionForm.patchValue({
      date: now.format('YYYY-MM-DDTHH:mm'),
    });
  }

  get walletId() {
    return this.transactionForm.get('walletId');
  }

  get category() {
    return this.transactionForm.get('category');
  }

  get subcategory() {
    return this.transactionForm.get('subcategory');
  }

  get amount() {
    return this.transactionForm.get('amount');
  }

  get description() {
    return this.transactionForm.get('description');
  }

  get location() {
    return this.transactionForm.get('location');
  }

  get transactionOrigin() {
    return this.transactionForm.get('transactionOrigin');
  }

  get date() {
    return this.transactionForm.get('date');
  }

  get isRecurringTransaction() {
    return this.transactionForm.get('isRecurringTransaction');
  }

  onCategorySelection(event: MatOptionSelectionChange, category: string) {
    if (event.isUserInput) {
      this.transactionForm.get('category')?.setValue(category);
    }
  }

  handleFormSubmit() {
    if (
      !this.amount?.value ||
      !this.walletId?.value ||
      !this.subcategory?.value ||
      !this.category?.value ||
      !this.date?.value
    ) {
      return;
    }
    const timestamp = convertDateToFirebaseTimestamp(this.date.value);

    const transaction: TransactionData = {
      walletId: this.walletId.value,
      category: this.category.value,
      subcategory: this.subcategory.value,
      amount: this.amount.value,
      description: this.description?.value || null,
      location: this.location?.value || null,
      recurringTransaction: this.isRecurringTransaction?.value!,
      transactionOrigin: this.transactionOrigin?.value || null,
      date: timestamp,
    };

    this.formSubmited.emit(transaction);
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!isNaN(date.getTime())) {
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const dateString = `${day}/${month}/${year}`;

      if (!dateRegex.test(dateString)) {
        return { dateFormat: true };
      }
    }

    return null;
  }
}
