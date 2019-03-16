import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { CartService } from './modules/cart/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'shopping-cart';
  quantity: number = 0;

  constructor(private cartService: CartService, private productService: ProductService) { };

  ngOnInit(): void {
    this.cartService.cartService.subscribe(data => {
      debugger;
      data ? this.setCartQuantity(data) : this.quantity = 0;
    });
  }

  setCartQuantity(products: any) {
    debugger;
    this.quantity = this.cartService.getTotalQuantity();
  }
}
