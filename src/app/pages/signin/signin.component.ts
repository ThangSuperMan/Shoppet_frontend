import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidationService } from 'src/app/_services/custom-validation/custom-validation.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  loginForm!: FormGroup;

  constructor(
    private toastService: ToastrService,
    private customValidator: CustomValidationService,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      },
      {
        validators: [this.customValidator.checkUsername('username')],
      }
    );
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  setUpLocalStorage(jwtToken: string, role: string) {
    this.userAuthService.setToken(jwtToken);
    this.userAuthService.setRoles(role);
  }

  handleLogin(loginForm: NgForm) {
    console.log('Login form submitted!');
    const user = {
      // @ts-ignore
      username: loginForm.username,
      // @ts-ignore
      password: loginForm.password,
    };

    if (user.username === '' || user.password === '') {
      this.toastService.error(
        'You have to fill the username and password',
        'Error credentials'
      );
    }

    this.userService.login(user).subscribe({
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
