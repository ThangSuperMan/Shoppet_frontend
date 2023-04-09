import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoComponent } from './logo/logo.component';
import { BannerComponent } from './banner/banner.component';
import { NavigationComponent } from './navigation/navigation.component';
import { IntroductionServiceComponent } from './introduction-service/introduction-service.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogoComponent,
    BannerComponent,
    NavigationComponent,
    IntroductionServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
