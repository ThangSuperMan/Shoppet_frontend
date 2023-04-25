import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  @ViewChild('optionColorProduct') optionColorProduct: ElementRef | undefined;
  @ViewChild('inputOptionColorProduct') inputOptionColorProduct:
    | ElementRef
    | undefined;

  changeOptionColorProduct(newColor: string): void {
    // @ts-ignore
    this.optionColorProduct.nativeElement.innerText = newColor;
    // @ts-ignore
    this.inputOptionColorProduct.nativeElement.innerText = newColor;
  }

  handleChangeColorProduct(event: MouseEvent): void {
    console.log(
      'inputOptionColorProduct :>> ',
      this.inputOptionColorProduct?.nativeElement
    );
    console.log('handleChangeColorProduct');
    // @ts-ignore
    const newColor = event.target.parentNode.children[0].value;
    this.changeOptionColorProduct(newColor);
  }
}
