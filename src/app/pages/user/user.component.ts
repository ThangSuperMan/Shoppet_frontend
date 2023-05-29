import { Component } from '@angular/core';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/_services/cart/cart.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(
    private toastService: ToastrService,
    private userSerivce: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProfileUser();
  }

  getProfileUser() {
    console.log('forUser in user route just triggered!');
    this.userSerivce.getUserProfile().subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
        console.log('here');
        this.toastService.success('Sign in successfully');
        // this.cartService.clearnCartFromLocalStorage();
      },
      error: (error: any) => {
        console.log('Error when call forAdmin method :>> ', error);
      },
    });
  }
}
