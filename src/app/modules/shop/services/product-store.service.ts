import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from '../../../service/utility.service';
import { ProductsInterface } from '../../../shared/model/products.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {

  productItemsStore: ProductsInterface[] = [];
  private productChanged = new BehaviorSubject<ProductsInterface[]>(this.productItemsStore);
  productStore = this.productChanged.asObservable();

  constructor(private utilityService: UtilityService) {
  }

  /**
   * @description This product will update the quantity and stock of products from cart page.
   * when we add or remove items from in the cart page , we need to show the same in product page.
   * @param product {ProductsInterface} products
   */
  updateQuantity(product: ProductsInterface) {
    if (this.productItemsStore.find(productItem => productItem._id === product._id)) {
      this.productItemsStore.forEach(productItem => {
        if (productItem._id === product._id) {
          productItem.quantity = product.quantity;
          productItem.stock['remaining'] = productItem.stock['remaining'];
        }
      });
    }
    else {
      this.productItemsStore = [...this.productItemsStore, product];
    }
    this.productChanged.next(this.productItemsStore);
  }

  /**
   * @description This function will populate the products list in store with the products 
   * fetched from API.
   * @param products {ProductsInterface} products
   */
  setProducts(products: ProductsInterface[]) {
    if (this.productItemsStore.length === 0) {
      this.productItemsStore = products;
      this.productChanged.next(
        this.productItemsStore);
    }
  }

  /**
 * @description Decreases the stock of a product by 1.
 * currently this is called by cart Service when product is Added to the cart,
 * then the stock is Decreases by 1.
 * @param product {ProductsInterface} product
 */
  removeRemainingStock(product: ProductsInterface) {
    this.productItemsStore.forEach(prod => {
      if (prod._id === product._id) {
        product.stock['remaining'] = product.stock['remaining'] - 1;
      }
    });
    this.productChanged.next(this.productItemsStore);
  }

/**
 * @description Increase the stock of a product by 1.
 * currently this is called by cart Service when product is removed from cart,
 * then the stock is increased by 1.
 * @param product {ProductsInterface} product
 */
  addProductStock(product: ProductsInterface) {
    this.productItemsStore.forEach(prod => {
      if (prod._id === product._id) {
        product.stock['remaining'] = product.stock['remaining'] + 1;
      }
    });
    this.productChanged.next(this.productItemsStore);
  }

  /**
   * @description returns a product matching with the requested product id
   * @param id {string}
   */
  getProduct(id:string):ProductsInterface{
    return this.productItemsStore.find(product=>product._id===id);
  }

}