import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from '../../../service/utility.service';
import { ProductsInterface } from '../../../shared/model/products.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {

  productItemsStore: ProductsInterface[] = [];
  private productSubject = new BehaviorSubject<ProductsInterface[]>(this.productItemsStore);
  productObservale = this.productSubject.asObservable();

  constructor(private utilityService: UtilityService) {
  }

  updateQuantity(product: ProductsInterface) {
    if (this.productItemsStore.find(productItem => productItem._id === product._id)) {
      this.productItemsStore.forEach(productItem => {
        if (productItem._id === product._id) {
          productItem.quantity === product.quantity && productItem.stock['remaining'] === productItem.stock['remaining']
        }
      });
    }
    else {
      this.productItemsStore = [...this.productItemsStore, product];
    }
    this.productSubject.next(this.productItemsStore);
  }

  setProducts(products: ProductsInterface[]) {
    this.productItemsStore = products;
    this.productSubject.next(
      this.productItemsStore);
  }


  addToCart(product: ProductsInterface) {
    this.productItemsStore.forEach(prod => {
      if (prod._id === product._id && product.stock['remaining'] > 0) {
        if (product.quantity) {
          product.quantity = product.quantity + 1;
          product.stock['remaining'] = product.stock['remaining'] - 1;
        }
        else {
          product.quantity = 1;
          product.stock['remaining'] = product.stock['remaining'] - 1;
        }

      }
    });
  }

  removeFromCart(product: ProductsInterface) {
    this.productItemsStore.forEach(prod => {
      if (prod._id === product._id && product.quantity && product.quantity > 0) {
        if (product.quantity) {
          product.quantity = product.quantity - 1;
          product.stock['remaining'] = product.stock['remaining'] + 1;
        }
        else {
          product.quantity = 0;
          product.stock['remaining'] = product.stock['remaining'] + 1;
        }

      }
    });
  }


  //uutility service here

  //shortened naming convention

  //change productObservale - changed

}