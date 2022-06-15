import { NgModule } from '@angular/core';
import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    InventoryRoutingModule,
  ]
})
export class InventoryModule { }
