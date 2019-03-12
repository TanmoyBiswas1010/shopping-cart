import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStoreService } from '../services/product-store.service';
import { Iproduct } from '../../../shared/model/product';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() onPriceFilterChanged=new EventEmitter<number>();
products$:Iproduct[];
 colors=[];
 colorFilter:string;
  priceFilterMin:number;
  priceFilterMax:number;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
  private productStoreService:ProductStoreService) { }
  
  ngOnInit() {
    this.productStoreService.productObservale.subscribe((products:Iproduct[])=>{
      products.forEach(product=>{
        if(product.price>this.priceFilterMax || !this.priceFilterMax){
          this.priceFilterMax=product.price;
        }
        if(product.price<this.priceFilterMin || !this.priceFilterMin){
          this.priceFilterMin=product.price;
        }
      })

      this.products$=products;
      this.colors=Array.from(new Set(this.products$.map((item: any) => item.color)));
    });
    
    this.route.queryParamMap.subscribe(params=>{
      this.colorFilter=params.get('color');
    })
  }

  onPriceChanged({value}){
    if(value){
    this.pushQueryParams({price:value});
    }
  }

  pushQueryParams(params:any){
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
