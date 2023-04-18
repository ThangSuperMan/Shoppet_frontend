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
import { ProductComponent } from './pages/shop/components/product/product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthInterceptor } from './_auth/auth.interceptor';

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
    ProductComponent,
    AdminComponent,
    UserComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    LazyLoadImageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
