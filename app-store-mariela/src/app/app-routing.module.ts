import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAuthComponent } from '@layout/auth/view-auth.component';
import { LandingPageComponent } from '@layout/landing-page/landing-page.component';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';
import { AppGuardService } from './guard/app-guard.service';
import { LoginGuard } from './guard/login.guard';

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
    ]
  },
  {
    path: 'dashboard',
    component: SidebarComponent,
    canActivate: [AppGuardService], 
    data: { expectedRol: ['admin']},
    children: [
      { path: 'admin', loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule) },
      { path: 'inventory', loadChildren: () => import('@modules/inventory/inventory.module').then(m => m.InventoryModule) },
      { path: 'brands', loadChildren: () => import('@modules/brand/brand.module').then(m => m.BrandModule) },
      { path: 'categories', loadChildren: () => import('@modules/category/category.module').then(m => m.CategoryModule) },
      { path: 'orders', loadChildren: () => import('@modules/order/order.module').then(m => m.OrderModule) },
    ]
  },
  {
    path: 'auth',
    component: ViewAuthComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'login-register', loadChildren: () => import('@modules/auth/auth.module').then(m => m.AuthModule)  }
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
