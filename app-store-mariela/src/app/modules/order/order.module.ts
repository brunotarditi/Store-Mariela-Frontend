import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderProcessComponent } from './order-process/order-process.component';
import { SharedModule } from '@shared/shared.module';
import { StepsProcessComponent } from './steps-process/steps-process.component';
import { ListProductsAvailableComponent } from './list-products-available/list-products-available.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';


@NgModule({
  declarations: [
    OrderProcessComponent,
    StepsProcessComponent,
    ListProductsAvailableComponent,
    CartComponent,
    PaymentComponent,
    CartItemComponent,
    ListOrdersComponent
  ],
  imports: [
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
