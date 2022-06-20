import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SaveProductComponent } from './components/save-product/save-product.component';

const routes: Routes = [
  { path: '', component: ListProductsComponent },
  { path: 'save', component: SaveProductComponent },
  { path: 'detail', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
