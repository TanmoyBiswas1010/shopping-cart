//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Angular Material Modules
import {MatToolbarModule,MatIconModule, MatButtonModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';

//Routing Module
import { AppRoutingModule } from './app-routing.module';

//Services
//import { ProductService } from './service/product.service';
// import { CartService } from './service/cart.service';
import { UtilityService } from './service/utility.service';

//Components
import { AppComponent } from './app.component';
import { ShopComponent } from './modules/shop/shop.component';
import { FilterComponent } from './modules/shop/filter/filter.component';
import { ProductsComponent } from './modules/shop/products/products.component';
import { ProductDetailComponent } from './modules/shop/products/product-detail/product-detail.component';

//Pipes
import { ProductFilterPipe } from './shared/utility/product-filter.pipe';

//Directives
import { ColorDirective } from './shared/utility/color-directive';
import { ProductStoreService } from './modules/shop/services/product-store.service';
 
@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    FilterComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductFilterPipe,
    ColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatSliderModule,
    AppRoutingModule,
    MatIconModule
    
  ],
  providers: [//ProductService
    //,CartService
    ,UtilityService,ProductStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
