import { Injectable } from '@angular/core';
import { ProductsInterface } from '../shared/model/products.interface';

@Injectable()
export class UtilityService {

  constructor() { }

  public concatDescription(description: string): string {
    return description.substr(0, 40).concat('...');

  }

  public removeCurrencyFromPrice(price: string): number {
    return +price.replace(',', '').replace('$', '');
  }
}