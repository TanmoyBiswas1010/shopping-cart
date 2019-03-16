import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpResponse } from "@angular/common/http";
import { Observable, concat } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'url';
import { ProductStoreService } from '../services/product-store.service';
import { CartService } from '../../cart/services/cart.service';
import { ProductsInterface } from '../../../shared/model/products.interface';
import { UtilityService } from '../../../service/utility.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  products$: Observable<ProductsInterface[]>;
  colorFilter: string;
  priceFilter: number;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private utilityService: UtilityService,
    private productStoreService: ProductStoreService) {

  }

  ngOnInit() {
    this.products$ = this.productStoreService.productStore;
    this.route.queryParamMap.subscribe(params => {
      this.colorFilter = params.get('color');
      params.has('price') ? this.priceFilter = +params.get('price') : this.priceFilter = undefined;

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
   * @description showing only 40 characters of description in the products page
   * @param description {description} string
   */
  concatDescription(description: string) {
    if (description) {
      return this.utilityService.concatDescription(description);
    }
  }

  /**
   * @description removing '$' from price.
   * price is comming as '$100'  from the API.
   * @param description {description} string
   */
  removeCurrencyFromPrice(price: string) {
    if (price) {
      return this.utilityService.removeCurrencyFromPrice(price);
    }

  }

}
