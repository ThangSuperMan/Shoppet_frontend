import { Component } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(private userService: UserService) {}

  handleLogin(loginForm: any) {
    console.log('Login form submitted!');
    console.log('loginForm.value :>> ', loginForm.value);
    this.userService.login(loginForm.value).subscribe((res: any) => {
      console.log('res :>> ', res);
    });
    // this.userService.login(loginForm.value).subscribe(
    //   {
    //     complete: () => {
    //       console.log('complete');
    //     },
    //     error: (error: any) => {
    //       console.log(' error:>> ', error);
    //     },
    //     next: (data: any) => {
    //       console.log('data :>> ', data);
    //     },
    //   }
    // (response: any) => {
    //   console.log('response :>> ', response);
    // },
    // (error: Error) => {
    //   console.log('Error :>> ', error);
    // }
    // );
  }
}
