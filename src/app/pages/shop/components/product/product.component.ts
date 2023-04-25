import { Component, Input } from '@angular/core';
import { Product } from '@models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() products: Product[] = [];

  handleShowPopupRatingWindow(): void {
    console.log('handleShowPopupRatingWindow');
  }

  handleClosePopupRatingWindow(): void {
    console.log('handleClosePopupRatingWindow');
  }
}
