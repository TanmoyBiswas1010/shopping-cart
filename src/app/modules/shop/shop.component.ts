import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.productService.getProducts();
  }

}
