import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoComponent } from './logo/logo.component';
import { BannerComponent } from './pages/home/components/banner/banner.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './pages/home/components/navigation/navigation.component';
import { IntroductionServiceComponent } from './pages/home/components/introduction-service/introduction-service.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogoComponent,
    BannerComponent,
    NavigationComponent,
    IntroductionServiceComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
