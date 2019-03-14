import { Injectable } from '@angular/core';
import { Iproduct } from '../shared/model/product';

@Injectable()
export class UtilityService {

  constructor() { }


  modifyProductsProperties(products: Iproduct[]): Iproduct[] {
    products = this.concatDescription(products);
    products = this.removeCurrencyFromPrice(products);

    return products;
  }

  private concatDescription(products: Iproduct[]): Iproduct[] {
    products.forEach(product => {
      product.description = product.description.substr(0, 40).concat('...');
    });
    return products;
  }

  private removeCurrencyFromPrice(products: Iproduct[]): Iproduct[] {
    products.forEach(product => {
    product.price =
      parseFloat(product.price.replace(',', '').replace('$', ''));
    });

    return products;

  }
}