import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/_services/custom-validation/custom-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  registerForm!: FormGroup;

  constructor(private customValidator: CustomValidationService) {}

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
    console.log('registerForm :>> ', registerForm);
  }

}
