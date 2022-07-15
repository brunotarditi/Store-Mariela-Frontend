import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import * as fromComponents from './components';
import { TitleBottomComponent } from './components/titles/title-bottom/title-bottom.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    ...fromComponents.components,
    TitleBottomComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    ...fromComponents.components
  ]
})
export class SharedModule { }
