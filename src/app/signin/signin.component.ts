import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  @Input() isOpenPopupWindow: boolean | undefined;
  isActivePopupWindow: boolean = false;
  @Input() isShowFormPopup: boolean | undefined;

  toggle(): void {
    this.isActivePopupWindow = !this.isActivePopupWindow;
  }

  handleClickClosePopupWindow(): void {
    this.isActivePopupWindow = false;
  }

  transformPopupWindowWhenActive(): void {}

  ngOnChanges(): void {
    console.log('ngOnChanges');
    console.log('isShowFormPopup :>> ', this.isShowFormPopup);
    const signInContent = document.querySelector('.signin > div');
    const signIn = document.querySelector('.signin div');
    console.log('signIn element :>> ', signIn);
    if (this.isShowFormPopup) {
      if (signIn) {
        // @ts-ignore
        signIn.style.backgroundColor = 'red';
      }

      if (signInContent) {
        console.log('sigfixednIn content :>> ', signInContent);
      }
      // @ts-ignore
      // signIn.style.transform = 'translateX(-300px)';
    }
  }
}
