//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Angular Material Modules
import { MatToolbarModule, MatIconModule } from '@angular/material';

//Routing Module
import { AppRoutingModule } from './app-routing.module';

//Services
import { UtilityService } from './service/utility.service';

//Components
import { AppComponent } from './app.component';

// //Directives
import { ProductStoreService } from './modules/shop/services/product-store.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    UtilityService, ProductStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
