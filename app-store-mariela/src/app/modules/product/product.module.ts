import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { SaveProductComponent } from './components/save-product/save-product.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    SaveProductComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule,
  ]
})
export class ProductModule { }
