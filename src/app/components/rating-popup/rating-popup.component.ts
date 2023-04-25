import { Component } from '@angular/core';

@Component({
  selector: 'app-rating-popup',
  templateUrl: './rating-popup.component.html',
  styleUrls: ['./rating-popup.component.scss'],
})
export class RatingPopupComponent {
  rating: number = 4.5;
  isPopupVisible: boolean = false;
  isActivePopup: boolean = false;

  showPopup(): void {
    console.log('showPopup rating');
    this.isPopupVisible = true;
  }

  closePopup(): void {
    console.log('mouseOut rating');
    this.isPopupVisible = false;
  }
}
