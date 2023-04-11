import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoComponent } from './logo/logo.component';
import { BannerComponent } from './pages/home/components/banner/banner.component';
import { IntroductionServiceComponent } from './pages/home/components/introduction-service/introduction-service.component';
import { DiscountComponent } from './pages/home/components/discount/discount.component';
import { BottomNavigationComponent } from './pages/home/components/bottom-navigation/bottom-navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { SideNavComponent } from './sidenav/sidenav.component';
import { SigninComponent } from './signin/signin.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogoComponent,
    BannerComponent,
    BottomNavigationComponent,
    IntroductionServiceComponent,
    DiscountComponent,
    SideNavComponent,
    HomeComponent,
    SigninComponent,
    LayoutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
