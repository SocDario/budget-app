import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import * as moment from 'moment';
import { Wallet } from 'src/app/modules/wallet/models';
import { ExpenseTransaction } from '../../models';
import { Category } from '../../models/Category';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-expense-transaction-form',
  templateUrl: './expense-transaction-form.component.html',
  styleUrls: ['./expense-transaction-form.component.scss'],
})
export class ExpenseTransactionFormComponent {
  @Input() wallets?: Wallet[];
  @Input() categories?: Category[];
  @Output() formSubmited = new EventEmitter<ExpenseTransaction>();

  selectedWallet?: Wallet;
  transactionForm = this.fb.group({
    amount: [undefined, [Validators.required]],
    walletId: ['', [Validators.required]],
    category: ['', [Validators.required]],
    subcategory: ['', [Validators.required]],
    date: ['', [this.dateValidator, Validators.required]],
    transactionTo: '',
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

  get transactionTo() {
    return this.transactionForm.get('transactionTo');
  }

  get date() {
    return this.transactionForm.get('date');
  }

  get isRecurringTransaction() {
    return this.transactionForm.get('isRecurringTransaction');
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
    const timestamp = this.convertDateToFirebaseTimestamp(this.date.value);
    const formData = {
      walletId: this.walletId.value,
      category: this.category.value,
      subcategory: this.subcategory.value,
      amount: this.amount.value,
      description: this.description?.value || null,
      location: this.location?.value || null,
      transactionTo: this.transactionTo?.value || null,
      recurringTransaction: this.isRecurringTransaction?.value!,
      date: timestamp,
    };
    this.formSubmited.emit(formData);
  }

  onCategorySelection(event: MatOptionSelectionChange, category: string) {
    if (event.isUserInput) {
      this.transactionForm.get('category')?.setValue(category);
    }
  }

  onSelectWallet(wallet: Wallet) {
    this.selectedWallet = wallet;
  }

  convertDateToFirebaseTimestamp(dateString: string) {
    const date = new Date(dateString);
    const firebaseTimestamp = Timestamp.fromDate(date);
    return firebaseTimestamp;
  }

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
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
