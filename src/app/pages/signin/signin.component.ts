import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(
    private toastService: ToastrService,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  setUpLocalStorage(jwtToken: string, role: string) {
    this.userAuthService.setToken(jwtToken);
    this.userAuthService.setRoles(role);
  }

  handleLogin(loginForm: NgForm) {
    console.log('Login form submitted!');
    console.log('loginForm :>> ', loginForm);
    const user = {
      username: loginForm.value.username,
      password: loginForm.value.password,
    };

    if (user.username === '' || user.password === '') {
      this.toastService.error(
        'You have to fill the username and password',
        'Error credentials'
      );
    }

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
