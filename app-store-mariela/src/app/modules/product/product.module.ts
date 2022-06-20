import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { SaveProductComponent } from './components/save-product/save-product.component';
import { ProductService } from '@data/services/product.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    SaveProductComponent,
    ProductDetailComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule,
  ],
  providers: [ProductService]
})
export class ProductModule { }
