import { EventEmitter } from '@angular/core';
import { Component, Output } from '@angular/core';

interface SideNavToggleProps {
  isShowSideNav: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() onSideNavToggle: EventEmitter<SideNavToggleProps> =
    new EventEmitter<any>();
  isShowSideNav: boolean = false;

  toggleSideNav(): void {
    this.isShowSideNav = !this.isShowSideNav;
    this.onSideNavToggle.emit({ isShowSideNav: this.isShowSideNav });
  }
}
