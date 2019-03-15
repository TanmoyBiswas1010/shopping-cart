import { Component, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStoreService } from '../services/product-store.service';
import { ProductsInterface } from '../../../shared/model/products.interface';
import { UtilityService } from '../../../service/utility.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  products$: ProductsInterface[];
  colors = [];
  colorFilter: string;
  priceFilterMin: number;
  priceFilterMax: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilityService: UtilityService,
    private productStoreService: ProductStoreService) { }

  ngOnInit() {
    this.productStoreService.productObservale.subscribe((products: ProductsInterface[]) => {
      products.forEach(product => {
        if (product.price > this.priceFilterMax || !this.priceFilterMax) {
          this.priceFilterMax = product.price;
        }
        if (product.price < this.priceFilterMin || !this.priceFilterMin) {
          this.priceFilterMin = product.price;
        }
      })

      this.products$ = products;
      this.colors = Array.from(new Set(this.products$.map((item: any) => item.color)));
    });

    this.route.queryParamMap.subscribe(params => {
      this.colorFilter = params.get('color');
    })
  }

  onPriceChanged({ value }) {
    if (value) {
      this.pushQueryParams({ price: value });
    }
  }

  pushQueryParams(params: any) {
    debugger;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: "merge", // remove to replace all query params by provided
      });
  }
}

