import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '@layout/landing-page/landing-page.component';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LandingPageComponent,
    children: [
      { path: 'home', loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule) },
      { path: 'product', loadChildren: () => import('@modules/product/product.module').then(m => m.ProductModule) },
      { path: 'auth', loadChildren: () => import('@modules/auth/auth.module').then(m => m.AuthModule) },
    ]
  },
  {
    path: 'dashboard',
    component: SidebarComponent,
    children: [
      { path: 'admin', loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule) },
      { path: 'inventory', loadChildren: () => import('@modules/inventory/inventory.module').then(m => m.InventoryModule) },
      { path: 'auth', loadChildren: () => import('@modules/auth/auth.module').then(m => m.AuthModule) },
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
