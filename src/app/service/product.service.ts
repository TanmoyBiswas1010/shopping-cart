import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { ProductStoreService } from '../modules/shop/services/product-store.service';
import { Iproduct } from '../shared/model/product';
import { UrlEnum } from '../shared/enum/url.enum';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient
        , private productStoreService: ProductStoreService) { }

    getProducts() {
        this.http.get(UrlEnum.BASE_URL).subscribe((products: Iproduct[]) => {
            this.productStoreService.setProducts(products);
        });
    }

}