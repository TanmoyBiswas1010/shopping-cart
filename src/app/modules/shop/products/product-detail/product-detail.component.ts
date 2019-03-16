import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsInterface } from '../../../../shared/model/products.interface';
import { ProductStoreService } from '../../services/product-store.service';
import { ProductService } from '../../../../service/product.service';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private productStore: ProductStoreService,
    private productService: ProductService,
    private cartService:CartService
  ) { }
  product: ProductsInterface;
  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if (param.has('_id')) {
        this.product = this.productStore.getProduct(param.get('_id'));
        // if (!this.product) {
        //   this.productService.getProducts();
        //   this.product = this.productStore.getProduct(param.get('_id'));
        // }
      }
    })
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

}
