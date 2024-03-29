import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardService } from 'app/guard/app-guard.service';
import { BrandComponent } from './components/brand/brand.component';

const routes: Routes = [
  { path: '', component: BrandComponent},
  { path: ':id', component: BrandComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
