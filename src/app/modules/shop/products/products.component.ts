import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpResponse } from "@angular/common/http";
import { Observable, concat } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'url';
import { ProductStoreService } from '../services/product-store.service';
import { Iproduct } from '../../../shared/model/product';
import { CartService } from '../../cart/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  products$: Observable<Iproduct[]>;
  colorFilter: string;
  priceFilter: number;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productStoreService: ProductStoreService) {

  }

  ngOnInit() {

    this.products$ = this.productStoreService.productObservale;

    this.route.queryParamMap.subscribe(params => {
      this.colorFilter = params.get('color');
      params.has('price') ? this.priceFilter = +params.get('price') : this.priceFilter = undefined;

    });

  }

  addToCart(product: Iproduct) {
    this.productStoreService.addToCart(product);
    this.cartService.updateCart(product);

  }

  removeFromCart(product: Iproduct) {
    this.productStoreService.removeFromCart(product);
    this.cartService.updateCart(product);
  }


}
