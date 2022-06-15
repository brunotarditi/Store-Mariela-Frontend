import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'home', loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule) },
      { path: 'product', loadChildren: () => import('@modules/product/product.module').then(m => m.ProductModule) },
      { path: 'inventory', loadChildren: () => import('@modules/inventory/inventory.module').then(m => m.InventoryModule) },
    ]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
