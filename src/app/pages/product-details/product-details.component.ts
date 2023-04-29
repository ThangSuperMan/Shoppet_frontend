import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product/product.service';
import { Brand, FoodFlavor, Product } from '@models';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  @ViewChild('optionFlavorProduct') optionFlavorProduct: ElementRef | undefined;
  @ViewChild('inputOptionFlavorProduct') inputOptionFlavorProduct:
    | ElementRef
    | undefined;
  @ViewChild('optionColorProduct') optionColorProduct: ElementRef | undefined;
  @ViewChild('inputOptionColorProduct') inputOptionColorProduct:
    | ElementRef
    | undefined;
  product: Product | undefined;
  productDetail: any | undefined;
  brand: Brand | undefined;
  foodFlavors: FoodFlavor[] | undefined;
  lastFlavor: string | undefined;

  constructor(
    private router: Router,
    private productSerivce: ProductService,
    private route: ActivatedRoute
  ) {}

  handleGoBackPreviousPage() {
    this.router.navigate(['/shop']);
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    console.log('ProductDetailsComponent getProuduct method is running...');
    const routeParams: ParamMap = this.route.snapshot.paramMap;
    const productId: number = Number(routeParams.get('product_id'));
    console.log('productId :>> ', productId);
    this.productSerivce.getProduct(productId).subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
        this.product = response.product;
        this.brand = response.brand;
        this.foodFlavors = response.foodFlavors;
        if (this.foodFlavors) {
          this.lastFlavor = this.foodFlavors[this.foodFlavors.length - 1].name;
          console.log('lastFlavor :>> ', this.lastFlavor);
        }
      },
      error: (error: any) => {
        console.log('Error :>> ', error);
      },
    });
  }

  changeOptionFlavorProduct(flavor: string): void {
    console.log('changeOptionFlavorProduct');
    // @ts-ignore
    this.optionFlavorProduct.nativeElement.innerText = flavor;
    // @ts-ignore
    this.optionFlavorProduct.nativeElement.innerText = flavor;
  }

  changeOptionColorProduct(newColor: string): void {
    console.log('changeOptionColorProduct');
    // @ts-ignore
    this.optionColorProduct.nativeElement.innerText = newColor;
    // @ts-ignore
    this.inputOptionColorProduct.nativeElement.innerText = newColor;
  }

  handleChangeFlavorProduct(event: MouseEvent): void {
    console.log('handleChangeFlavorProduct');
    // @ts-ignore
    const flavor = event.target.children[1].innerText;
    this.changeOptionFlavorProduct(flavor);
  }

  handleChangeColorProduct(event: MouseEvent): void {
    console.log('handleChangeColorProduct');
    // @ts-ignore
    const newColor = event.target.parentNode.children[0].value;
    this.changeOptionColorProduct(newColor);
  }
}
