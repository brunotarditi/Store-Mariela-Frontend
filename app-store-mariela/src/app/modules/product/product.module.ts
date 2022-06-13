import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { SaveProductComponent } from './components/save-product/save-product.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    SaveProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductModule { }
