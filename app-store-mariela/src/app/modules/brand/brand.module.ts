import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './components/brand/brand.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    BrandComponent
  ],
  imports: [
    SharedModule,
    BrandRoutingModule
  ]
})
export class BrandModule { }
