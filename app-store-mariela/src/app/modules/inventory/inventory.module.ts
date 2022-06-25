import { NgModule } from '@angular/core';
import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { SaveProductComponent } from './components/save-product/save-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductService } from '@data/services/product.service';

@NgModule({
  declarations: [
    ListProductsComponent,
    SaveProductComponent,
    ProductDetailComponent
  ],
  imports: [
    SharedModule,
    InventoryRoutingModule,
  ],
  providers: [ProductService]
})
export class InventoryModule { }
