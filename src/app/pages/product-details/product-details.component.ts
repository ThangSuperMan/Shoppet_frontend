import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product/product.service';
import { Brand, FoodFlavor, Product } from '@models';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';
import { CartService } from 'src/app/_services/cart/cart.service';

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
  aboutThisItem: any | undefined;
  brand: Brand | undefined;
  foodFlavors: FoodFlavor[] | undefined;
  lastFlavor: string | undefined;

  constructor(
    private logger: NgxFancyLoggerService,
    private route: ActivatedRoute,
    private router: Router,
    private productSerivce: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  handleGoBackPreviousPage() {
    this.router.navigate(['/shop']);
  }

  handleAddToCart(quantityProduct: string) {
    console.log('handleAddToCart');
    console.log('this.product :>> ', this.product);
    if (this.product) {
      this.product.quantity = parseInt(quantityProduct);
      console.log('quantityProduct :>> ', quantityProduct);
      this.cartService.setCartToLocalStorage(this.product);
    }
  }

  getProduct(): void {
    this.logger.header(
      'ProductDetailsComponent getProuduct method is running...'
    );
    const routeParams: ParamMap = this.route.snapshot.paramMap;
    const productTitle: string | null = routeParams.get('product_title');
    console.log('productTitle :>> ', productTitle);
    if (productTitle) {
      this.productSerivce.getProduct(productTitle).subscribe({
        next: (response: any) => {
          this.logger.info('response :>> ', response);
          this.product = response.product;
          this.brand = response.brand;
          this.foodFlavors = response.foodFlavors;
          this.productDetail = response.productDetail;
          if (this.productDetail) {
            this.aboutThisItem = this.productDetail.description.split('<br>');
            console.log('aboutThisItem :>> ', this.aboutThisItem);
          }
          if (this.foodFlavors) {
            this.lastFlavor =
              this.foodFlavors[this.foodFlavors.length - 1].name;
          }
        },
        error: (error: any) => {
          console.log('Error :>> ', error);
        },
      });
    }
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
