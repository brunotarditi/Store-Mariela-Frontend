import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../modules/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ]
})
export class MenuModule { }
