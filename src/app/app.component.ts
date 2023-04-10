import { Component } from '@angular/core';

interface SideNavToggleProps {
  isShowSideNav: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Shoppet_frontend';
  isShowSideNav: boolean = false;

  doSomething({ isShowSideNav }: SideNavToggleProps): void {
    console.log('doSomething triggered from child');
    console.log('isShowSideNav from child:>> ', isShowSideNav);
    this.isShowSideNav = isShowSideNav;
  }

  ngOnInit(): void {
    // Logic from animate the sidenav from left to right
    // const body = document.querySelector('body');
    // if (body) {
    //   body.style.transform = 'translateX(200px)';
    // }
  }
}
