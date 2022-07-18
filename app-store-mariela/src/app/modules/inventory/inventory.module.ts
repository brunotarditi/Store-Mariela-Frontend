import { NgModule } from '@angular/core';
import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { SaveProductComponent } from './components/save-product/save-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductService } from '@data/services/product.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DialogFormStockComponent } from './components/dialog-form-stock/dialog-form-stock.component';

@NgModule({
  declarations: [
    ListProductsComponent,
    SaveProductComponent,
    ProductDetailComponent,
    DialogFormStockComponent
  ],
  imports: [
    SharedModule,
    InventoryRoutingModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [ProductService]
})
export class InventoryModule { }
