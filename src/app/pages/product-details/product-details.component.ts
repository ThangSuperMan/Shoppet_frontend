import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product/product.service';
import { Brand, FoodFlavor, Order, Product, User } from '@models';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';
import { CartService } from 'src/app/_services/cart/cart.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { OrderService } from 'src/app/_services/order/order.service';
import { UserService } from 'src/app/_services/user/user.service';

interface NextProps {
  response: any;
  callback: () => void;
}

interface ErrorProps {
  response: any;
  callback: () => void;
}

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
    private userAuthService: UserAuthService,
    private userService: UserService,
    private productSerivce: ProductService,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  // I have declared function:
  // _translate(value: T, callback: (name: T) => T): void;
  // And function is:
  // public _translate(value: T, callback: T) {
  // if (!this.translate) {
  //  callback(value);
  // }
  // }

  handleNext(response: any, callback: () => void): void {
    console.log('response :>> ', response);
    callback();
  }

  handleError(error: any, callback: () => void): void {
    console.log('Error :>> ', error);
    callback();
  }

  handleGoBackPreviousPage() {
    this.router.navigate(['/shop']);
  }

  handleAddToCart(quantityProduct: string) {
    console.log('handleAddToCart');
    console.log('this.product :>> ', this.product);
    if (this.userAuthService.isLoggedIn()) {
      // Save the product to our server
      // with jwt auth acdess token

      if (this.product) {
        const { id, quantity } = this.product;

        this.userService.forUser().subscribe({
          next: (response: any) => {
            console.log('response :>> ', response);
            const user: User = JSON.parse(response).user;
            console.log('user :>> ', user);
            console.log('user.id :>> ', user.id);
            if (user.id) {
              const order: Order = {
                productId: id,
                quantity: quantity,
                userId: user.id,
              };
              this.orderService.saveOrder(order).subscribe({
                next: (response: any) => {
                  console.log('response :>> ', response);
                },
                error: (error: any) => {
                  console.log('error :>> ', error);
                },
              });
            }
          },
          error: (error: any) => {
            console.log('error here :>> ', error);
          },
        });
      }
    }
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
