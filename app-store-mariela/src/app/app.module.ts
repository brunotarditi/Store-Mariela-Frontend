import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from '@layout/header/header.component';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';
import { FooterComponent } from '@layout/footer/footer.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import localeEs from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { ViewAuthComponent } from './layout/auth/view-auth.component';
import { interceptorProvider } from './interceptors/interceptor.service';
registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LandingPageComponent,
    ViewAuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    interceptorProvider,
    {provide: LOCALE_ID, useValue: 'ar-AR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
