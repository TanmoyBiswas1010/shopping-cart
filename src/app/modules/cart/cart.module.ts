import { NgModule } from "@angular/core";
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { Routes } from '@angular/router';
import { MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
    imports:[CartRoutingModule,
        MatIconModule,
        CommonModule
        ],
    declarations:[CartComponent
    ],
    exports:[CartComponent,
        CartRoutingModule,
        MatIconModule
    ]
})
export class CartModule{

}