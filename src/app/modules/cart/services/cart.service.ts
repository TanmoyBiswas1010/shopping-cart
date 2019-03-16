import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductStoreService } from '../../shop/services/product-store.service';
import { ProductsInterface } from '../../../shared/model/products.interface';
import { UtilityService } from '../../../service/utility.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartItemsStore: ProductsInterface[] = [];
    private cartItemChanged = new BehaviorSubject<ProductsInterface[]>(this.cartItemsStore); // behavir suject initial value
    cartService = this.cartItemChanged.asObservable();
    public cartItems: Observable<ProductsInterface[]>;
    constructor(private productStoreService: ProductStoreService, private utilityService: UtilityService) { }

    /**
     * @description This function is used to add items to the cart.
     * user adds items in the cart, from cart page using this function
     * user adds item in the cart, from products page using this function
     * @param product {ProductsInterface} product
     */
    addToCart(product: ProductsInterface) {
        if (this.cartItemsStore.find(cartItem => cartItem._id === product._id)) {
            this.cartItemsStore.forEach(cartItem => {
                if (cartItem._id === product._id && product.stock['remaining'] > 0) {
                    debugger;
                    cartItem.quantity = product.quantity + 1;
                    this.productStoreService.removeRemainingStock(product);
                }
            });
        }
        else {
            product.quantity = 1;
            this.cartItemsStore.push(product);
            this.productStoreService.removeRemainingStock(product);
        }

        this.cartItemChanged.next(this.cartItemsStore);
    }

    /**
     * @description This function is used to remove item from cart.
     * user remove items from cart page using this function
     * user remove item from products page using this function
     * @param product {ProductsInterface} product
     */
    removeFromCart(product: ProductsInterface) {
        if (this.cartItemsStore.find(cartItem => cartItem._id === product._id)) {
            this.cartItemsStore.forEach(cartItem => {
                if (cartItem._id === product._id && product.quantity > 0) {
                    cartItem.quantity = product.quantity - 1;
                    this.productStoreService.addProductStock(product);
                }
            });
        }
        this.cartItemChanged.next(this.cartItemsStore);

    }

    /**
     * @description returns Total number of items present in the cart
     */
    getTotalQuantity() {
        return this.cartItemsStore.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0);
    }

    /**
     * @description returns Total Price of items present in the cart
     */
    getTotalPrice() {
        return this.cartItemsStore.reduce((totalPrice, product) => totalPrice + (this.utilityService.removeCurrencyFromPrice(product.price) * product.quantity), 0);

    }

    /**
     * @description Empty the cart
     */
    clearAll() {
        this.cartItemsStore.forEach(product => {
            while (product.quantity > 0) {
                product.quantity = product.quantity - 1;
                product.stock['remaining'] = product.stock['remaining'] + 1;
            }
            this.productStoreService.updateQuantity(product);
        });
        while (+this.cartItemsStore.length > 0) {
            this.cartItemsStore.pop();
        }
        this.cartItemChanged.next(this.cartItemsStore);
    }
}