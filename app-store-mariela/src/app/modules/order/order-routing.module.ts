import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrderProcessComponent } from './order-process/order-process.component';

const routes: Routes = [
  { path: '', component: ListOrdersComponent },
  { path: 'new', component: OrderProcessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
