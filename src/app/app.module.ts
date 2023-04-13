import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './pages/home/components/banner/banner.component';
import { IntroductionServiceComponent } from './pages/home/components/introduction-service/introduction-service.component';
import { DiscountComponent } from './pages/home/components/discount/discount.component';
import { BottomNavigationComponent } from './pages/home/components/bottom-navigation/bottom-navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

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
    SignupComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, LazyLoadImageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
