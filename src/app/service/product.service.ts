import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductStoreService } from '../modules/shop/services/product-store.service';
import { UrlEnum } from '../shared/enum/url.enum';
import { ProductsInterface } from '../shared/model/products.interface';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient
        , private productStoreService: ProductStoreService) { }

    getProducts() {
        this.http.get(UrlEnum.BASE_URL).subscribe((products: ProductsInterface[]) => {
            this.productStoreService.setProducts(products);
        },error=>console.log(error));
    }

}