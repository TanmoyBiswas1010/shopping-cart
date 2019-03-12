import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../shared/model/product';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService) { }
  totalQuantity:number=0;
  totalPrice:number=0;
  cartItems:Iproduct[]=[];
  
  ngOnInit() {
    this.cartService.cartObservable.subscribe( products => { 
      this.cartItems = products;
      if(products) {
        this.totalQuantity = this.cartService.getTotalQuantity();  
        this.totalPrice = this.cartService.getTotalPrice();
      }
      else {
        this.totalQuantity=0;
        this.totalPrice = 0;
      }
    });

  }

  addToCart(product:Iproduct){
    this.cartService.addToCart(product);
    }
  
    removeFromCart(product:Iproduct){
      this.cartService.removeFromCart(product);
    }

    clearAll() {
      this.cartItems=undefined;
        this.cartService.clearAll();

    }
}
