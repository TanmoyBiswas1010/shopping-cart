import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

//ShopRoutuning 
import { ShopRoutingModule } from './shop-routing.module';

//Angular Material Modules
import {MatIconModule, MatButtonModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';

//Components
import { ShopComponent } from './shop.component';
import { FilterComponent } from './filter/filter.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

//Pipe
import { ProductFilterPipe } from '../../shared/utility/product-filter.pipe';
//Directives

import { ColorDirective } from '../../shared/utility/color-directive';


@NgModule({
imports:[ShopRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    CommonModule
],
declarations:[ShopComponent,
    FilterComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductFilterPipe,
    ColorDirective
],
exports:[ShopRoutingModule,MatIconModule]
})
export class ShopModule{

}