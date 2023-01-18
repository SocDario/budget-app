import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceTransform',
})
export class PriceTransformPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
    });
  }
}
