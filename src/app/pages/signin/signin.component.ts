import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  setUpLocalStorage(jwtToken: string, role: string) {
    this.userAuthService.setToken(jwtToken);
    this.userAuthService.setRoles(role);
  }

  handleLogin(loginForm: NgForm) {
    console.log('Login form submitted!');
    this.userService.login(loginForm.value).subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
        const jwtToken: string = response.jwtToken;
        const role: string = response.user.role;
        this.setUpLocalStorage(jwtToken, role);

        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: (error: any) => {
        console.log('Error in login component :>> ', error);
      },
    });
  }
}
