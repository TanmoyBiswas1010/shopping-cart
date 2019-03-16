import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { ProductsInterface } from '../../shared/model/products.interface';
import { UtilityService } from '../../service/utility.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private utilityService: UtilityService) { }
  totalQuantity: number = 0;
  totalPrice: number = 0;
  cartItems: ProductsInterface[] = [];

  ngOnInit() {
    this.cartService.cartService.subscribe(products => {
      this.cartItems = products;
      if (products) {
        this.totalQuantity = this.cartService.getTotalQuantity();
        this.totalPrice = this.cartService.getTotalPrice();
      }
      else {
        this.totalQuantity = 0;
        this.totalPrice = 0;
      }
    });

  }

    /**
   * @description calls cart service and adds/increase quantity of a product to the cart.
   * @param product {ProductsInterface} product
   */
  addToCart(product: ProductsInterface) {
    this.cartService.addToCart(product);
  }

     /**
   * @description calls cart service and removes/decreases quantity of a product to the cart.
   * @param product {ProductsInterface} product
   */
  removeFromCart(product: ProductsInterface) {
    this.cartService.removeFromCart(product);
  }

    /**
   * @description removing '$' from price.
   * price is comming as '$100'  from the API.
   * @param description {description} string
   */
  removeCurrencyFromPrice(price: string) {
    return this.utilityService.removeCurrencyFromPrice(price);
  }

  /**
   * @description removes all the prodcts from cart 
   */
  clearAll() {
    //this.cartItems = undefined;
    this.cartService.clearAll();

  }
}
