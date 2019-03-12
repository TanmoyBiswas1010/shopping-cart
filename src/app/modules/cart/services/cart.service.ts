import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Iproduct } from '../../../shared/model/product';
import { ProductStoreService } from '../../shop/services/product-store.service';



@Injectable({
    providedIn:'root'
})
export class CartService{

    cartItemsStore:Iproduct[]=[];
    private cartSubjest = new BehaviorSubject<Iproduct[]>(this.cartItemsStore); // behavir suject initial value
    cartObservable = this.cartSubjest.asObservable();
    public cartItems: Observable<Iproduct[]>;
    constructor(private productStoreService:ProductStoreService) {}
    
    updateCart(product:Iproduct) {
        if(this.cartItemsStore.find(cartItem => cartItem._id === product._id)) {
            this.cartItemsStore.forEach(cartItem => cartItem._id === product._id 
                ? cartItem.quantity === product.quantity : 1 === 1);
        }
        else {
            this.cartItemsStore.push(product);
        }
        this.productStoreService.updateQuantity(product);
        this.cartSubjest.next(this.cartItemsStore);
    }

  addToCart(product:Iproduct){
    this.cartItemsStore.forEach(prod=>{
     if(prod._id===product._id && product.stock['remaining']>0 ){
      if(product.quantity){
        product.quantity=product.quantity+1;
        product.stock['remaining']=product.stock['remaining']-1;
      }
      else{
        product.quantity=1;
        product.stock['remaining']=product.stock['remaining']-1;
      }
  
     }
      });
      this.updateCart(product);
    }
  
    removeFromCart(product:Iproduct){
      this.cartItemsStore.forEach(prod=>{
        if(prod._id===product._id && product.quantity && product.quantity>0){
         if(product.quantity){
           product.quantity=product.quantity-1;
           product.stock['remaining']=product.stock['remaining']+1;
         }
         else{
           product.quantity=0;
           product.stock['remaining']=product.stock['remaining']+1;
         }
  
        }
         });
         this.updateCart(product);
    }

    getTotalQuantity(){
        return this.cartItemsStore.reduce((totalQuantity, product) => totalQuantity + product.quantity,0);
    }

    getTotalPrice(){
        return this.cartItemsStore.reduce((totalPrice, product) => totalPrice + (product.price * product.quantity),0);
        
    }
    clearAll(){
        this.cartItemsStore.forEach(product=>{
            while(product.quantity > 0) {
                product.quantity = product.quantity - 1;
                product.stock['remaining'] = product.stock['remaining'] + 1;
            }
            this.productStoreService.updateQuantity(product);
        });
        this.cartItemsStore=undefined;
        this.cartSubjest.next(this.cartItemsStore);
    }
}