import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderProcessComponent } from './order-process/order-process.component';

const routes: Routes = [
  { path: '', component: OrderProcessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
