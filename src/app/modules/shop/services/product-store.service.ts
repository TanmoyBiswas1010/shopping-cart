import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { UtilityService } from '../../../service/utility.service';
import { Iproduct } from '../../../shared/model/product';




@Injectable({
  providedIn:'root'
})
export class ProductStoreService{

    productItemsStore:Iproduct[]=[];
    private productSubject=new BehaviorSubject<Iproduct[]>(this.productItemsStore);
    productObservale=this.productSubject.asObservable();

    constructor(private utilityService:UtilityService) { 
    }

    updateQuantity(product:Iproduct) {
      debugger;
        if(this.productItemsStore.find(productItem => productItem._id === product._id)) {
          debugger;
            this.productItemsStore.forEach(productItem => productItem._id === product._id 
                ? productItem.quantity === product.quantity && productItem.stock['remaining'] === productItem.stock['remaining'] : 1 === 1);
        }
        else {
            this.productItemsStore=[...this.productItemsStore,product]; 
        }
        this.productSubject.next(this.productItemsStore);
    }

    setProducts(products:Iproduct[]){
        this.productItemsStore = products;
        this.productSubject.next(
            this.utilityService.modifyProductsProperties(
                this.productItemsStore));
    }

    
  addToCart(product:Iproduct){
    this.productItemsStore.forEach(prod=>{
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
    }
  
    removeFromCart(product:Iproduct){
      this.productItemsStore.forEach(prod=>{
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
    }


    //uutility service here

    //shortened naming convention

    //change productObservale - changed

}