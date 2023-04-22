import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidationService } from 'src/app/_services/custom-validation/custom-validation.service';
import {
  RegisterProps,
  UserService,
} from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  registerForm!: FormGroup;

  constructor(
    private customValidator: CustomValidationService,
    private userService: UserService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ])
        ),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [
          this.customValidator.checkUsername('username'),
          this.customValidator.matchPassword('password', 'confirmPassword'),
        ],
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  handleRegister(registerForm: NgForm): void {
    console.log('handleRegister');
    console.log('registerForm.value :>> ', registerForm.value);
    const registerData: RegisterProps = {
      // @ts-ignore
      username: registerForm.username,
      // @ts-ignore
      password: registerForm.password,
      // @ts-ignore
      confirmPassword: registerForm.confirmPassword,
    };
    this.userService.signup(registerData).subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
        if (response.signUpSuccessfully === true) {
          this.toastService.success(response.message);
          this.registerForm.reset();
        }
      },
      error: (error: any) => {
        console.log('Error :>> ', error);
      },
    });
  }
}
