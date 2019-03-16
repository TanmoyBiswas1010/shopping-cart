import { Injectable } from '@angular/core';
import { ProductsInterface } from '../shared/model/products.interface';

@Injectable()
export class UtilityService {

  constructor() { }

  
  /**
   * @description showing only 40 characters of description in the products page
   * @param description {description} string
   */
  public concatDescription(description: string): string {
    return description.substr(0, 40).concat('...');

  }

    /**
   * @description removing '$' from price.
   * price is comming as '$100'  from the API.
   * @param description {description} string
   */
  public removeCurrencyFromPrice(price: string): number {
    return +price.replace(',', '').replace('$', '');
  }
}