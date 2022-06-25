import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ProductService } from '@data/services/product.service';
import { StoreProductsComponent } from './components/store-products/store-products.component';


@NgModule({
  declarations: [
    StoreProductsComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule,
  ],
  providers: [ProductService]
})
export class ProductModule { }
