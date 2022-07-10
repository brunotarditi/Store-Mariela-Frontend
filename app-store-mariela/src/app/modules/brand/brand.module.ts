import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './components/brand/brand.component';


@NgModule({
  declarations: [
    BrandComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule
  ]
})
export class BrandModule { }
