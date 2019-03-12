import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './modules/shop/shop.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  {path:'cart',loadChildren:'./modules/cart/cart.module#CartModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
