import { Component, Input } from '@angular/core';
import { sideNavData, sideNavProps } from './sidenav-data';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SideNavComponent {
  @Input() isShowSideNav: boolean = false;
  @Input() message: string | undefined;
  sideNavData: sideNavProps[] = sideNavData;

  handleOnClickBodyEl = () => {
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay');
    if (this.isShowSideNav) {
      if (body) {
        overlay?.classList.remove('active');
        body.style.transform = 'translateX(0px)';
      }
    } else {
      if (body) {
        body.style.transform = 'translateX(0px)';
      }
    }
  };

  handleToggleSideNav(): void {
    const body = document.querySelector('body');
    if (this.isShowSideNav) {
      return;
    } else {
      if (body) {
        body.style.transform = 'translateX(0)';
        body.style.transform = 'none';
      }
    }
  }

  ngOnChanges(): void {
    const overlay = document.querySelector('.overlay');
    const body = document.querySelector('body');

    if (this.isShowSideNav) {
      // Disable scroll
      window.onscroll = function () {
        window.scroll(0, 0);
      };

      overlay?.classList.add('active');
      if (body) {
        body.style.transition = 'transform 0.3s ease';
        body.style.transform = 'translateX(300px)';
      }
    } else {
      // Enable scroll
      window.onscroll = function () {};

      overlay?.removeEventListener('click', this.handleToggleSideNav);
      if (body) {
        body.style.transform = 'none';
      }
    }
  }
}
