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
  isShowSideNav: boolean = false;

  handleToggleSideNav({ isShowSideNav }: SideNavToggleProps): void {
    this.isShowSideNav = isShowSideNav;
  }
}
