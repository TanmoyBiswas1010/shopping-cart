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

    this.products$ = this.productStoreService.productObservale;

    this.route.queryParamMap.subscribe(params => {
      this.colorFilter = params.get('color');
      params.has('price') ? this.priceFilter = +params.get('price') : this.priceFilter = undefined;

    });

  }

  addToCart(product: ProductsInterface) {
    this.productStoreService.addToCart(product);
    this.cartService.updateCart(product);

  }

  removeFromCart(product: ProductsInterface) {
    this.productStoreService.removeFromCart(product);
    this.cartService.updateCart(product);
  }

  concatDescription(description: string) {
    if (description) {
      return this.utilityService.concatDescription(description);
    }
  }

  removeCurrencyFromPrice(price: string) {
    if (price) {
      return this.utilityService.removeCurrencyFromPrice(price);
    }

  }

}
