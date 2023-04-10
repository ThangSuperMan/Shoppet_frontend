import { Component, Input } from '@angular/core';
import { sideNavData, sideNavProps } from './sidenav-data';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SideNavComponent {
  @Input() isShowSideNav: boolean = false;
  @Input() message?: string;
  sidenavData: sideNavProps[] = sideNavData;

  constructor() {
    console.log('Just render SideNavComponent');
  }

  ngAfterContentChecked() {
    const body = document.querySelector('body');

    const handleOnClickBodyEl = () => {
      console.log('handleOnClickBodyEl');
      if (body) {
        body.classList.add('new');
        body.classList.remove('body-active');
      }
    };

    if (this.isShowSideNav) {
      if (body) {
        body.style.transition = 'transform 0.3s ease';
        body.style.transform = 'translateX(300px)';
        body.style.transform = 'translateX(300px)';
        // body.style.background = 'red';
        body.classList.add('body-active');

        body.addEventListener('click', handleOnClickBodyEl);

        // body.addEventListener('click', () => {
        //   console.log('just click body');
        //   body.classList.add('new');
        //   body.classList.remove('body-active');
        // });
      }
    } else {
      if (body) {
        body.style.transform = 'translateX(0)';
        body.removeEventListener('click', handleOnClickBodyEl);
      }
    }
  }
}
