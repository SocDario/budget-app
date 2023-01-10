import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '([formControlName], [formControl])[disabledControl]',
})
export class DisableControlDirective {
  // eslint-disable-next-line accessor-pairs
  @Input() set disabledControl(state: boolean) {
    if (state) {
      this.ngControl.control?.disable();
      return;
    }

    this.ngControl.control?.enable();
  }

  constructor(private readonly ngControl: NgControl) {}
}
