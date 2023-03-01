import { AbstractControl } from '@angular/forms';

export function dateValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
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

export function nonNegativeNumberValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const value = control.value;
    if (value < 0) {
      return { negativeNumber: true };
    }
    return null;
  }
